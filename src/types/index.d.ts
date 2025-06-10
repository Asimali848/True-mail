declare type StripePaySession = {
  id: string;
};

declare type GlobalState = {
  token: string;
  test_id: string;
  sso: boolean;
};

declare type PostItem = {
  name: string;
  description: string;
};

declare type GetItem = {
  id: number;
  name: string;
  description: string;
};

declare type RegisterResponse = {
  id_token: string;
};
declare type Register = {
  first_name: string;
  email: string;
  password: string;
};

declare type Forget = {
  email: string;
};
declare type Login = {
  email: string;
  password: string;
};
declare type LoginResponse = {
  data: {
    message: string;
    status_code: number;
    firebase_id_token: string;
  };
};

declare type GoogleLogin = {
  url: string;
};

declare type Profile = {
  message: string;
  status_code: number;
  data: {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    city: string;
    gender: string;
    photo_url: string;
    country: string;
    state: string;
    zip_code: string;
    total_credits: number;
    remaining_credits: number;
  };
};
declare type ProfileUpdate = {
  first_name: string;
  last_name?: string;
  address?: string;
  city?: string;
  gender?: string;
  photo_url?: string;
  country?: string;
  state?: string;
  zip_code?: string;
};

declare type Invoices = {
  message: string;
  status_code: number;
  data: InvoiceData[];
};

declare type InvoiceData = {
  id: number;
  amount: number;
  number: string;
  status: boolean;
  created_at: string;
};

declare type Stripe = {
  success_url: string;
  card_price: number;
  credits: number;
};

declare type VerifiedEmail = {
  id: number;
  user_tested_email: string;
  full_name: string;
  gender: string;
  status: string;
  reason: string;
  domain: string;
  is_free: boolean;
  is_risky: boolean;
  is_valid: boolean;
  is_disposable: boolean;
  is_deliverable: boolean;
  has_tag: boolean;
  is_mailbox_full: boolean;
  has_role: boolean;
  is_accept_all: boolean;
  has_no_reply: boolean;
  alphabetical_characters: number;
  has_numerical_characters: number;
  has_unicode_symbols: number;
  score: number;
  smtp_provider: string;
  mx_record: string;
  implicit_mx_record: string;
};

declare type Single_Email = {
  message: string;
  status_code: number;
  test_id: string;
  data: VerifiedEmail | null;
};

declare type Multi_Email = {
  message: string;
  status_code: number;
  test_id: string;
  data: {
    id: any;
    user_tested_email: string;
    full_name: string;
    gender: string;
    status: string;
    reason: string;
    domain: string;
    is_free: boolean;
    is_risky: boolean;
    is_valid: boolean;
    is_disposable: boolean;
    is_deliverable: boolean;
    has_tag: boolean;
    is_mailbox_full: boolean;
    has_role: boolean;
    is_accept_all: boolean;
    has_no_reply: boolean;
    alphabetical_characters: number;
    has_numerical_characters: number;
    has_unicode_symbols: number;
    score: number;
    smtp_provider: string;
    mx_record: string;
    implicit_mx_record: string;
  }[];
};

declare type ChangePassword = {
  new_password: string;
};

declare type CopyPaste = {
  file_name: string;
  test_emails: string[] | Record<string, unknown[]>;
};

declare type CopyPasteResponse = {
  message: string;
  status: number;
  task_id: string;
  data: null;
};

declare type RecordsList = {
  message: string;
  status: number;
  data: {
    id: number;
    file_name: string;
    total_emails: number;
    deliverable: number;
    status: string;
  }[];
};

declare type GetOverview = {
  id: number;
  file_name: string;
  total: number;
  duplicates: number;
  deliverable: number;
  undeliverable: number;
  risky: number;
  status: string;
  duplicated_percentage: number;
  deliverable_percentage: number;
  undeliverable_percentage: number;
  risky_percentage: number;
  uploaded_at: string;
};

declare type DownloadProducts = {
  message: string;
  status: number;
  data: [
    {
      user_tested_email: string;
      full_name: string;
      gender: string;
      status: string;
      reason: string;
      domain: string;
      is_free: true;
      is_risky: true;
      is_valid: true;
      is_disposable: true;
      is_deliverable: true;
      has_tag: true;
      alphabetical_characters: 0;
      is_mailbox_full: true;
      has_role: true;
      is_accept_all: true;
      has_numerical_characters: 0;
      has_unicode_symbols: 0;
      has_no_reply: true;
      smtp_provider: string;
      mx_record: string;
      implicit_mx_record: string;
      score: 0;
    },
  ];
};
