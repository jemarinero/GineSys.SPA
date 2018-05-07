import { Component, OnInit, ViewChild } from '@angular/core';
import { Aseguradora } from '../../models/aseguradora';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs/Subscription';
import { AseguradorasService } from '../../services/aseguradoras.service';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../shared/services/auth.service';
import { AseguradoraNewComponent } from './aseguradora-new/aseguradora-new.component';
import { AseguradoraEditComponent } from './aseguradora-edit/aseguradora-edit.component';
import { DeleteDialogComponent } from '../../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-aseguradoras',
  templateUrl: './aseguradoras.component.html',
  styleUrls: ['./aseguradoras.component.css']
})
export class AseguradorasComponent implements OnInit {
  aseguradoras: Aseguradora[];
  displayedColumns = [
    'actions',
    'id',
    'nombre',
    'direccion',
    'telefonoFijo',
    'fax',
    'telefonoMovil',
    'correo',
    'contacto',
    'usuarioCreacion',
    'fechaCreacion',
    'usuarioModificacion',
    'fechaModificacion'
  ];
  dataSource = new MatTableDataSource<Aseguradora>();
  subscription: Subscription; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private asegSevice: AseguradorasService, 
    private alertify: AlertifyService,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadAseguradoras();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadAseguradoras() {
    this.subscription = this.asegSevice
      .getAll()
      .subscribe((aseg: Aseguradora[]) => {
        this.aseguradoras = aseg;
        this.initTable(this.aseguradoras);
      }, error => {
        this.alertify.error(error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  initTable(aseguradoras: Aseguradora[]) {
    this.dataSource.data = aseguradoras;
    this.dataSource.paginator = this.paginator;
  }

  newDialog() {
    this.dialog.open(AseguradoraNewComponent, {
      width: '500px'
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
        let aseguradora = {
          nombre: res.nombre,
          usuarioCreacion: this.authService.decodedToken.unique_name
        }
        this.create(<Aseguradora>aseguradora);
      }
    });
  }

  editDialog(aseguradora) {
    this.dialog.open(AseguradoraEditComponent, {
      width: '600px',
      data: aseguradora
    })
    .afterClosed()
    .subscribe(aseguradora => {
      if(aseguradora) {
        aseguradora.usuarioModificacion = this.authService.decodedToken.unique_name;
        this.update(aseguradora);
      }
    });
  }

  deleteDialog(aseguradora) {
    this.dialog.open(DeleteDialogComponent,{
      width: '500px',
      data: '['+aseguradora.id+'] '+aseguradora.nombre
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
       this.delete(aseguradora);
      }
    });
  }

  update(aseguradora: Aseguradora) {
    this.asegSevice
      .update(aseguradora.id,aseguradora)
      .subscribe(() => {
          this.alertify.success('Aseguradora: '+aseguradora.id+': '+aseguradora.nombre+'. Actualizado correctamente.');
          this.loadAseguradoras();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

  delete(aseguradora: Aseguradora) {
    this.asegSevice
        .delete(aseguradora.id)
        .subscribe(() => {
          this.alertify.success('Aseguradora: '+aseguradora.id+': '+aseguradora.nombre+'. Eliminado correctamente.');
          this.loadAseguradoras();
        }, 
        error => {
          this.alertify.error('Ocurrió un error! '+error);
          this.loadAseguradoras();
        });
  }

  create(aseguradora: Aseguradora) {
    this.asegSevice
      .create(aseguradora)
      .subscribe(() => {
          this.alertify.success('Aseguradora: '+aseguradora.nombre+'. Creado correctamente.');
          this.loadAseguradoras();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

}
