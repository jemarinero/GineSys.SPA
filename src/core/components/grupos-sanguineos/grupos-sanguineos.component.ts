import { Component, OnInit, ViewChild } from '@angular/core';
import { GrupoSanguineo } from '../../models/grupo-sanguineo';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/Subscription';
import { MatPaginator } from '@angular/material/paginator';
import { GruposSanguineosService } from '../../services/grupos-sanguineos.service';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../shared/services/auth.service';
import { GrupoSanguineoEditComponent } from './grupo-sanguineo-edit/grupo-sanguineo-edit.component';
import { GrupoSanguineoNewComponent } from './grupo-sanguineo-new/grupo-sanguineo-new.component';
import { DeleteDialogComponent } from '../../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-grupos-sanguineos',
  templateUrl: './grupos-sanguineos.component.html',
  styleUrls: ['./grupos-sanguineos.component.css']
})
export class GruposSanguineosComponent implements OnInit {
  gruposSanguineos: GrupoSanguineo[];
  displayedColumns = [
    'actions',
    'id', 
    'descripcion', 
    'fechaCreacion', 
    'fechaModificacion', 
    'usuarioCreacion', 
    'usuarioModificacion'
  ];
  dataSource = new MatTableDataSource<GrupoSanguineo>();
  subscription: Subscription; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private dataService: GruposSanguineosService, 
    private alertify: AlertifyService,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData() {
    this.subscription = this.dataService
      .getAll()
      .subscribe((data: GrupoSanguineo[]) => {
        this.gruposSanguineos = data;
        this.initTable(this.gruposSanguineos);
      }, error => {
        this.alertify.error(error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  initTable(data: GrupoSanguineo[]) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  }

  newDialog() {
    this.dialog.open(GrupoSanguineoNewComponent, {
      width: '500px'
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
        let data = {
          descripcion: res.descripcion,
          usuarioCreacion: this.authService.decodedToken.unique_name
        }
        this.create(<GrupoSanguineo>data);
      }
    });
  }

  editDialog(data) {
    this.dialog.open(GrupoSanguineoEditComponent, {
      width: '500px',
      data: data
    })
    .afterClosed()
    .subscribe(ocupacion => {
      if(ocupacion) {
        ocupacion.usuarioModificacion = this.authService.decodedToken.unique_name;
        this.update(ocupacion);
      }
    });
  }

  deleteDialog(data) {
    this.dialog.open(DeleteDialogComponent,{
      width: '500px',
      data: '['+data.id+'] '+data.descripcion
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
       this.delete(data);
      }
    });
  }

  update(data: GrupoSanguineo) {
    this.dataService
      .update(data.id,data)
      .subscribe(() => {
          this.alertify.success('Registro: '+data.id+': '+data.descripcion+'. Actualizado correctamente.');
          this.loadData();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

  delete(data: GrupoSanguineo) {
    this.dataService
        .delete(data.id)
        .subscribe(() => {
          this.alertify.success('Registro: '+data.id+': '+data.descripcion+'. Eliminado correctamente.');
          this.loadData();
        }, 
        error => {
          this.alertify.error('Ocurrió un error! '+error);
          this.loadData();
        });
  }

  create(data: GrupoSanguineo) {
    this.dataService
      .create(data)
      .subscribe(() => {
          this.alertify.success('Registro: '+data.descripcion+'. Creado correctamente.');
          this.loadData();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

}
