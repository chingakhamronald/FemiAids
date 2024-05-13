export type emergencyDataType = {
  id: any;
  title: string;
  mobile_number: number;
};

export type IMedicalData = {
  id: string;
  name: string;
  img: string;
  description: string;
  symptoms: string;
  treatment: string;
};

export type docType = {
  id: string;
  name: string;
  gender: string;
  address: string;
  mobile_number: number;
  hospital: string;
  place: string;
};

export interface ISchemeData {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
}
