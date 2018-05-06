import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OcupacionesService } from './../../services/ocupaciones.service';
import { Ocupacion } from './../../models/ocupacion';
import { AlertifyService } from './../../../shared/services/alertify.service';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatDialog } from '@angular/material';
import { OcupacionEditComponent } from './ocupacion-edit/ocupacion-edit.component';
import { DeleteDialogComponent } from '../../../shared/components/delete-dialog/delete-dialog.component';
import { OcupacionNewComponent } from './ocupacion-new/ocupacion-new.component';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-ocupaciones',
  templateUrl: './ocupaciones.component.html',
  styleUrls: ['./ocupaciones.component.css']
})
export class OcupacionesComponent implements OnInit, OnDestroy {
  ocupaciones: Ocupacion[];
  displayedColumns = [
    'actions',
    'id', 
    'descripcion', 
    'fechaCreacion', 
    'fechaModificacion', 
    'usuarioCreacion', 
    'usuarioModificacion'
  ];
  dataSource = new MatTableDataSource<Ocupacion>();
  subscription: Subscription; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private ocupSevice: OcupacionesService, 
    private alertify: AlertifyService,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadOcupaciones();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadOcupaciones() {
    this.subscription = this.ocupSevice
      .getAll()
      .subscribe((ocups: Ocupacion[]) => {
        this.ocupaciones = ocups;
        this.initTable(this.ocupaciones);
      }, error => {
        this.alertify.error(error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  initTable(ocupaciones: Ocupacion[]) {
    this.dataSource.data = ocupaciones;
    this.dataSource.paginator = this.paginator;
  }

  newDialog() {
    this.dialog.open(OcupacionNewComponent, {
      width: '500px'
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
        let ocupacion = {
          descripcion: res.descripcion,
          usuarioCreacion: this.authService.decodedToken.unique_name
        }
        this.create(<Ocupacion>ocupacion);
      }
    });
  }

  editDialog(ocupacion) {
    this.dialog.open(OcupacionEditComponent, {
      width: '500px',
      data: ocupacion
    })
    .afterClosed()
    .subscribe(ocupacion => {
      if(ocupacion) {
        ocupacion.usuarioModificacion = this.authService.decodedToken.unique_name;
        this.update(ocupacion);
      }
    });
  }

  deleteDialog(ocupacion) {
    this.dialog.open(DeleteDialogComponent,{
      width: '500px',
      data: '['+ocupacion.id+'] '+ocupacion.descripcion
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
       this.delete(ocupacion);
      }
    });
  }

  update(ocupacion: Ocupacion) {
    this.ocupSevice
      .update(ocupacion.id,ocupacion)
      .subscribe(() => {
          this.alertify.success('Ocupación: '+ocupacion.id+': '+ocupacion.descripcion+'. Actualizado correctamente.');
          this.loadOcupaciones();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

  delete(ocupacion: Ocupacion) {
    this.ocupSevice
        .delete(ocupacion.id)
        .subscribe(() => {
          this.alertify.success('Ocupación: '+ocupacion.id+': '+ocupacion.descripcion+'. Eliminado correctamente.');
          this.loadOcupaciones();
        }, 
        error => {
          this.alertify.error('Ocurrió un error! '+error);
          this.loadOcupaciones();
        });
  }

  create(ocupacion: Ocupacion) {
    this.ocupSevice
      .create(ocupacion)
      .subscribe(() => {
          this.alertify.success('Ocupación: '+ocupacion.descripcion+'. Creado correctamente.');
          this.loadOcupaciones();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }
}
