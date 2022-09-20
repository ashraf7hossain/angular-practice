import { provideFirebaseApp , getApp , initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
provideFirebaseApp(()=> initializeApp(environment.firebase)),
provideFirestore(()=> getFirestore())