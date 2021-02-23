export enum REQ_STATUS {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESSED = 'succeeded',
  FAILED = 'failed',
}

export enum GENDER {
  MALE = 'M',
  FEMALE = 'F',
  OTHER = 'O',
}

export enum SMOKE {
  DEF = -1,
  NOSMOKE = 0,
  OCCASIONALLY = 1,
  OFTEN = 2
}

export enum REGISTER_STATE {
  HAS = 1,
  NONE = 0
}

export enum PWD_STATE {
  SETED = 1,
  UNSET = 0
}

export enum REQ_METHOD {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export enum HEALTH_REC_VIEW_MDOE {
  COMPLETE = 'COMPLETE',
  EDIT = 'edit',
  READONLY = 'readonly'
}

export enum STOREAGE_KEYS { // base64
  LOGINED = 'TE9HSU5FRA',
  VC_CLOCK = 'VkNfQ0xPQ0s',
  OPENID = 'b3BlbklE',
  NO_NEED_LOGIN = 'Tk9fTE9HSU4',
  LOCK_ROUTE = 'cmVkaXJlY3Q',
  R_ROUTE = 'cmVkaXJlY3Qgcm91dGU', // redirect route name
  R_ROUTE_PARAMS = 'cmVkaXJlY3Qgcm91dGUgcGFyYW1z', // redirect route params
  KEEP_TOKEN = 'a2VlcFRva2Vu'
}

export enum URL_PARAMS {
  OPENID = 'openid',
  NO_NEED_LOGIN = 'no_login',
  LOCK_ROUTE = 'redirect',
  ID = 'id'
}

export enum NO_LOGIN_VALS {
  TRUE = '1',
  FALSE = '0'
}

export enum REDIRECT_VALS {
  TRUE = '1',
  FALSE = '0'
}


export enum FIELD_STATE {
  DEF = 'default',
  FOCUS = 'focus',
  WARN = 'warning',
  DISABLED = 'disabled'
}

export enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum KEYBOARD_TYPE {
  DEF = 'default',
  NUM_PAD = 'number-pad',
  DECIMAL = 'decimal-pad',
  NUM = 'numeric',
  EMAIL = 'email-address',
  PHONE = 'phone-pad'
}

export enum APPT_STATUS {
  NEW = 'new',
  CONFIRMING = 'confirming',
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired'
}

export enum WEEK {
  MON = 'Monday',
  TUE = 'Tuesday',
  WED = 'Wednesday',
  THU = 'Thursday',
  FRI = 'Friday',
  SAT = 'Saturday',
  SUN = 'Sunday',
}

export enum WEEKI18N {
  Monday = "dating-dates-weekday-mon",
  Tuesday = "dating-dates-weekday-tue",
  Wednesday = "dating-dates-weekday-wed",
  Thursday = "dating-dates-weekday-thu",
  Friday = "dating-dates-weekday-fri",
  Saturday = "dating-dates-weekday-sat",
  Sunday = "dating-dates-weekday-sun",
}

export enum TIME {
  AM = 'morning',
  PM = 'afternoon'
}

export enum TIMEI18N {
  AM = 'dating-dates-day-am',
  PM = 'dating-dates-day-pm'
}

export enum APPT_ACTION_BTNS {
  NEW = 'dating-btn-new',
  CONFIRMING = 'dating-btn-check',
  CONFIRMED = 'dating-btn-check',
  EXPIRED = 'dating-btn-renew'
}