import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import * as _ from 'lodash';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import {ThreadsService} from "./services/threads.service";
import { ApplicationState, INITIAL_APPLICATION_STATE } from "./store/application-state";
import { Action } from "@ngrx/store";
import { LOAD_USER_THREADS_ACTION, LoadUserThreadsAction } from "./store/actions";

export function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: Action): ApplicationState {
  switch(action.type) {
    case LOAD_USER_THREADS_ACTION:
      return handleLoadUserThreadsAction(state, action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state: ApplicationState, action: LoadUserThreadsAction): ApplicationState {
const userData = action.payload;

const newState: ApplicationState = Object.assign({}, state);

newState.storeData = {
  participants: _.keyBy(action.payload.participants, 'id'),
  messages: _.keyBy(action.payload.messages, 'id'),
  threads: _.keyBy(action.payload.threads, 'id')
};
return newState;

}

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(storeReducer)
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
