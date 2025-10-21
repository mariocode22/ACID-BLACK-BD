import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class SupabaseClientService {
private client: SupabaseClient;


constructor() {
this.client = createClient(environment.supabaseUrl, environment.supabaseKey);
}


get supabase() {
return this.client;
}
}
