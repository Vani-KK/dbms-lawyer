export interface Court {
  id: string;
  location: string;
  judgeName: string;
}

export const dummyCourts: Court[] = [
  {
    id: "COU123",
    location: "Mangalore",
    judgeName: "jn1",
  },
  {
    id: "COU456",
    location: "Bangalore",
    judgeName: "jn2",
  },
  {
    id: "COU789",
    location: "Delhi",
    judgeName: "jn3",
  },
];
