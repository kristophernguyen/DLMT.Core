import { Injectable } from "@angular/core";
import { IMessage } from 'src/app/model/imessage';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class MessageService {
    private subject = new Subject<IMessage>();

    sendMessage(message: IMessage) {
        this.subject.next(message);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}