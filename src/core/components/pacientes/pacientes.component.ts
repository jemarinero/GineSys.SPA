import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Paciente } from './../../models/paciente';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/Subscription';
import { MatPaginator } from '@angular/material/paginator';
import { PacientesService } from './../../services/pacientes.service';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../shared/services/auth.service';
import { DeleteDialogComponent } from '../../../shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit, OnDestroy {
  pacientes: Paciente[];
  displayedColumns = [
    'actions',
    'id',
    'nombre',
    'direccion',
    'fechaNacimiento',
    'edad',
    'telefono',
    'correo',
    'estado'
  ];
  dataSource = new MatTableDataSource<Paciente>();
  subscription: Subscription; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private dataService: PacientesService, 
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
      .subscribe((data: Paciente[]) => {
        this.pacientes = data;
        this.initTable(this.pacientes);
      }, error => {
        this.alertify.error(error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  initTable(data: Paciente[]) {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
  }


  deleteDialog(data) {
    this.dialog.open(DeleteDialogComponent,{
      width: '500px',
      data: '['+data.id+'] '+data.nombre
    })
    .afterClosed()
    .subscribe(res => {
      if(res) {
       this.delete(data);
      }
    });
  }

  update(data: Paciente) {
    this.dataService
      .update(data.id,data)
      .subscribe(() => {
          this.alertify.success('Registro: '+data.id+': '+data.nombre+'. Actualizado correctamente.');
          this.loadData();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

  delete(data: Paciente) {
    this.dataService
        .delete(data.id)
        .subscribe(() => {
          this.alertify.success('Registro: '+data.id+': '+data.nombre+'. Eliminado correctamente.');
          this.loadData();
        }, 
        error => {
          this.alertify.error('Ocurrió un error! '+error);
          this.loadData();
        });
  }

  create(data: Paciente) {
    this.dataService
      .create(data)
      .subscribe(() => {
          this.alertify.success('Registro: '+data.nombre+'. Creado correctamente.');
          this.loadData();
      }, error => 
        this.alertify.error('Ocurrió un error!')
      );
  }

}
