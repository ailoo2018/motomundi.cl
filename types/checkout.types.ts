
export interface Address {
  countryCode: string;
  countryName: string;
  idType: string;
  nif: string;
  name: string;
  surnames: string;
  address: string;
  address2: string | null;
  state: string;
  city: string;
  comuna: string | null; // Set to string | null since it was null in your example
  postalCode: string;
  dialCode: string;
  phone: string;
  comuna_id: number;
}

export interface ShipmentInformation {
  method: number;
  address: Address;
  store: string | null;       // Assuming store is a string or object ID when present
  pickupOption: string;
  modifiedDate: string;       // ISO Date string
  carrierId: number;
  comments: string;
  remarks: string;
}

export interface CustomerInformation {
  phone: string;
  email: string;
  address: Address;
}
