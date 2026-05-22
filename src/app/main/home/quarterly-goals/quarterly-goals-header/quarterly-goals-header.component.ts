import { Component, OnInit, ChangeDetectionStrategy, input, output, inject, WritableSignal, Signal, signal, computed, Inject, Injector } from '@angular/core';
import { QuarterlyGoalsHeaderAnimations } from './quarterly-goals-header.animations';
import { User } from 'src/app/core/store/user/user.model';
import { AuthStore } from 'src/app/core/store/auth/auth.store';
import { BatchWriteService, BATCH_WRITE_SERVICE } from 'src/app/core/store/batch-write.service';
import { getQuarterAndYear }  from 'src/app/core/utils/time.utils';
import { QuarterlyGoalsModalComponent} from 'src/app/main/home/quarterly-goals/quarterly-goals-modal/quarterly-goals-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-quarterly-goals-header',
  templateUrl: './quarterly-goals-header.component.html',
  styleUrls: ['./quarterly-goals-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: QuarterlyGoalsHeaderAnimations,
  standalone: true,
  imports: [
    
  ],
})
export class QuarterlyGoalsHeaderComponent implements OnInit {
  readonly authStore = inject(AuthStore);
  private dialog = inject(MatDialog);

  // --------------- INPUTS AND OUTPUTS ------------------

  /** The current signed in user. */
  currentUser: Signal<User> = this.authStore.user;

  // --------------- LOCAL UI STATE ----------------------

  dialogRef: MatDialogRef<any>;

  /** Loading icon. */
  loading: WritableSignal<boolean> = signal(false);
  
  getQuarterAndYear = getQuarterAndYear;
  // --------------- COMPUTED DATA -----------------------

  openModal(pencilClicked: boolean) {
    this.dialogRef = this.dialog.open(QuarterlyGoalsModalComponent, {
      height: '90%',
      position: { bottom: '0' },
      data: {
        pencilClicked,
        loading: this.loading, // so the modal can know that status of loading/updates
      },
      panelClass: ['dialog-side-panel', 'no-dialog-anim'],
    });
  }
  // --------------- EVENT HANDL ING ----------------------
  
  // --------------- OTHER -------------------------------

  constructor(
    private injector: Injector,
  ) { }

  // --------------- LOAD AND CLEANUP --------------------
  
  ngOnInit(): void {
  }
}
