import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NotifyService} from '../../services/notify.service';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationMessageComponent implements OnInit {

  constructor(public notify: NotifyService)  { }

  ngOnInit() {
  }

}
