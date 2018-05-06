import { Component, OnInit, ViewChild } from '@angular/core';
import { Religion } from '../../models/religion';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/Subscription';
import { MatPaginator } from '@angular/material/paginator';
import { ReligionesService } from '../../services/religiones.service';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../shared/services/auth.service';
import { ReligionNewComponent } from './religion-new/religion-new.component';
import { ReligionEditComponent } from './religion-edit/religion-edit.component';
import { DeleteDialogComponent } from '../../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-religiones',
  templateUrl: './religiones.component.html',
  styleUrls: ['./religiones.component.css']
})
export class ReligionesComponent implements OnInit {
  religiones: Religion[];
  displayedColumns = [
    'actions',
    'id', 
    'descripcion', 
    'fechaCreacion', 
    'fechaModificacion', 
    'usuarioCreacion', 
    'usuarioModificacion'
  ];
  dataSource = new MatTableDataSource<Religion>();
  subscription: Subscription; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private ocupSevice: ReligionesService, 
    private alertify: AlertifyService,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadReligiones();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadReligiones() {
    this.subscription = this.ocupSevice
      .getAll()
      .subscribe((relig: Religion[]) => {
        this.religiones = relig;
        this.initTable(this.religiones);
      }, error => {
        this.alertify.error(error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  initTable(religiones: Religion[]) {
    this.dataSource.data = religiones;
    this.dataSource.paginator = this.paginator;
  }

  newDialog() {
    this.dialog.open(ReligionNewComponent, {
      width: '500px'
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
        let religion = {
          descripcion: res.descripcion,
          usuarioCreacion: this.authService.decodedToken.unique_name
        }
        this.create(<Religion>religion);
      }
    });
  }

  editDialog(religion) {
    this.dialog.open(ReligionEditComponent, {
      width: '500px',
      data: religion
    })
    .afterClosed()
    .subscribe(religion => {
      if(religion) {
        religion.usuarioModificacion = this.authService.decodedToken.unique_name;
        this.update(religion);
      }
    });
  }

  deleteDialog(religion) {
    this.dialog.open(DeleteDialogComponent,{
      width: '500px',
      data: '['+religion.id+'] '+religion.descripcion
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
       this.delete(religion);
      }
    });
  }

  update(religion: Religion) {
    this.ocupSevice
      .update(religion.id,religion)
      .subscribe(() => {
          this.alertify.success('Religión: '+religion.id+': '+religion.descripcion+'. Actualizado correctamente.');
          this.loadReligiones();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

  delete(religion: Religion) {
    this.ocupSevice
        .delete(religion.id)
        .subscribe(() => {
          this.alertify.success('Religión: '+religion.id+': '+religion.descripcion+'. Eliminado correctamente.');
          this.loadReligiones();
        }, 
        error => {
          this.alertify.error('Ocurrió un error! '+error);
          this.loadReligiones();
        });
  }

  create(religion: Religion) {
    this.ocupSevice
      .create(religion)
      .subscribe(() => {
          this.alertify.success('Religión: '+religion.descripcion+'. Creado correctamente.');
          this.loadReligiones();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

}
