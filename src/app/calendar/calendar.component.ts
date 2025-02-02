import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ScheduleComponent, MonthService, DayService, WorkWeekService, AgendaService, MonthAgendaService, EventSettingsModel, ScheduleModule, ActionEventArgs, PopupOpenEventArgs, EventRenderedArgs, Week, WeekService } from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';
import { Observable, Subscription } from 'rxjs';
import { RessourcesService } from '../services/ressources/ressources.service';
import { Reservation } from '../models/Reservation';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ScheduleModule, CommonModule, DateTimePickerModule, ReactiveFormsModule, DateTimePickerModule, TextBoxModule, ButtonModule],
  providers: [DayService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, WeekService],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  selectedDate$: Date = new Date();
  reservations$!: Observable<Reservation[]>;;
  ressourceId!: number;
  userSubscription!: Subscription;

  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  public intl: Internationalization = new Internationalization();

  public eventSettings: EventSettingsModel = {
    fields: {
      subject: { title: 'Event Name', name: 'title'},
      startTime: { title: 'From', name: 'start_date' },
      endTime: { title: 'To', name: 'end_date' },
    },
   };

  constructor(private ressourcesService: RessourcesService, private route: ActivatedRoute) {
  }

  demandeAbsenceFrom = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });
  
  public onCreate(): void {
    this.route.paramMap.subscribe(params => {
      this.ressourceId = parseInt(params.get('id') ?? '0');
      this.initializeCalendar();});
    this.getReservationById();
    this.refreshEvents();
  }

  private initializeCalendar() {
    this.scheduleObj.currentView = 'Month';
    this.scheduleObj.views = ['Month'];
    this.scheduleObj.eventSettings.allowEditing = false;
  }

  private getReservationById() {
    const currentViewDates = this.scheduleObj.getCurrentViewDates();
    const startDate = currentViewDates[0];
    const endDate = currentViewDates[currentViewDates.length - 1];

    console.log('startDate', startDate.toISOString());
    console.log('endDate', endDate.toISOString());

    this.reservations$ = this.ressourcesService.getReservationsParRessourceId(this.ressourceId);
  

  this.reservations$.subscribe(reservations => {
}); 
  }

  private setTime(date: Date, hours: number, minutes: number = 0, seconds: number = 0): Date {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, seconds, 0);
    return newDate;
}

public onActionComplete(args: ActionEventArgs) {
  if (args.requestType === "viewNavigate" || args.requestType === "dateNavigate") {
    this.getReservationById();
    this.refreshEvents();
  }
}

public getHeaderStyles(data: Record<string, any>): Record<string, any> {
  if (data['elementType'] === 'cell') {
    return { 'align-items': 'center', color: '#000000' };
  } else {
    return { background: data['color'], color: '#FFFFFF' };
  }  
}

public getHeaderTitle(data: Record<string, any>): string {
  return (data['elementType'] === 'cell') ? 'Demander une absence' : 'Détails';
}

public getHeaderDetails(data: { [key: string]: Date }): string {
  return this.intl.formatDate(data['start_date'], { type: 'date', skeleton: 'full' })
}

public onCellClick(args: any): void {
  const clickedDate: Date = args.startTime;
  this.demandeAbsenceFrom.patchValue({
    start: clickedDate.toISOString(),
    end: clickedDate.toISOString()
  });
}

public demanderAbsence(): void {
  const formData = this.demandeAbsenceFrom.value;

  if (formData.start) {
    //Ici ca bricole parce que l'objet Date force avec son GMT +2
    const d = new Date(formData.start);
    const datePart = d.toLocaleDateString('fr-CA'); // Format: YYYY-MM-DD
    const formattedDateTime = `${datePart}`;
    formData.start = formattedDateTime;
  }

  if (formData.end) {
    //Ici ca bricole parce que l'objet Date force avec son GMT +2
    const d = new Date(formData.end);
    const datePart = d.toLocaleDateString('fr-CA'); // Format: YYYY-MM-DD
    const formattedDateTime = `${datePart}`;
    formData.end = formattedDateTime
  }

  const requestBody = {
    ressource_id : this.ressourceId,
    start_date: formData.start,
    end_date: formData.end,
    isAbsence: true
  }

  console.log('formData', requestBody);
  this.ressourcesService.demanderAbsence(requestBody).subscribe(
    (response) => {
      console.log('response', response);
      this.refreshEvents();
    },
    (error) => console.error('error', error)
  );
}
public onPopupOpen(args: PopupOpenEventArgs): void {
  if (args.type === 'Editor') {
    args.cancel = true;
  }
}
  public refreshEvents(): void {
    // Clear existing events
    this.scheduleObj.eventSettings.dataSource = [];
    this.scheduleObj.refreshEvents();
    // Add new events
    this.reservations$.subscribe(
      reservation => {        
        const updatedReservations = reservation.map((event: any) => {
          if (event.isAbsence) {
            event.title = 'Absence'; // Titre pour une absence
          } else {
            event.title = 'Projet'; // Titre pour un projet
          }
          return event;
        });
  
        // Met à jour les événements dans le calendrier
        this.scheduleObj.eventSettings.dataSource = updatedReservations;
      },
      error => {
        console.error('Erreur lors de la récupération des leçons', error);
      }
    );
  }
}