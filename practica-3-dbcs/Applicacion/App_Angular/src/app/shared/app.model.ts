export interface Usuario {
  id: String;
  name: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  enabled: Boolean;
  role: String;
  createdAt: String;
  updatedAt: String;
}

export interface Reserva{
  id:String;
  guestName:String;
  guestEmail:String;
  price:number;
  units:number;
  numGuest:number;
  status:String;
  dateIn: String;
  dateOut: String;
  created_at:String;
  updated_at:String;
}
