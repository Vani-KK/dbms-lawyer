export interface Lawyer {
  id: string;
  name: string;
  type: string;
  phone: string;
  address: string;
  email: string;
}

export const dummyLawyers: Lawyer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    type: "Corporate Law",
    phone: "+1 (555) 123-4567",
    address: "123 Legal Street, New York, NY 10001",
    email: "sarah.johnson@legalfirm.com"
  },
  {
    id: "2",
    name: "Michael Chen",
    type: "Criminal Law",
    phone: "+1 (555) 234-5678",
    address: "456 Justice Ave, Los Angeles, CA 90012",
    email: "michael.chen@legalfirm.com"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    type: "Family Law",
    phone: "+1 (555) 345-6789",
    address: "789 Court Road, Chicago, IL 60602",
    email: "emily.rodriguez@legalfirm.com"
  }
];