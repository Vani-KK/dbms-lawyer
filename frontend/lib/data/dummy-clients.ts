export interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export const dummyClients: Client[] = [
  {
    id: "1",
    name: "John Smith",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    address: "456 Park Ave, Boston, MA 02108",
  },
  {
    id: "3",
    name: "Michael Brown",
    phone: "+1 (555) 345-6789",
    address: "789 Oak Rd, Chicago, IL 60601",
  },
];