/*
 * Receives status codes (STATUS_*) and sets the LEDs assigned to
 * the pins (PIN_*) accordingly.
 */
 
int b = -1;
int pin = -1;

// Status codes
#define STATUS_ONLINE          '0'
#define STATUS_BUSY            '1'
#define STATUS_AWAY            '2'
#define STATUS_DO_NOT_DISTURB  '3'
#define STATUS_OFFLINE         '4'
#define STATUS_CLEAR           '9'

// Pin assignments
#define PIN_RED       7
#define PIN_YELLOW    8
#define PIN_GREEN    10
#define PIN_WHITE    12
#define PIN_NONE     -1
#define PIN_ALL      -2

void setup() {
  pinMode(PIN_RED,    OUTPUT);
  pinMode(PIN_YELLOW, OUTPUT);
  pinMode(PIN_GREEN,  OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    b = Serial.read();
    if (b >= 0) {
      
      // Clear the pins
      digitalWrite(PIN_RED,    LOW);
      digitalWrite(PIN_YELLOW, LOW);
      digitalWrite(PIN_GREEN,  LOW);
      
      // Write to the correct pin
      pin = PIN_NONE;
      switch (b) {
        case STATUS_CLEAR:
          break;
        case STATUS_ONLINE:
          pin = PIN_GREEN;
          break;
       case STATUS_BUSY:
          pin = PIN_YELLOW;
          break;
       case STATUS_AWAY:
          pin = PIN_RED;
          break;
       case STATUS_OFFLINE:
          pin = PIN_WHITE;
          break;
       case STATUS_DO_NOT_DISTURB:
          pin = PIN_ALL;
          break;   
      default:  
          pin = PIN_RED;         
      }
      Serial.print("I received: ");
      Serial.println(b, DEC);
      if (pin == PIN_ALL) {
        Serial.println("Setting all pins");
        digitalWrite(PIN_RED, HIGH);
        digitalWrite(PIN_YELLOW, HIGH);
        digitalWrite(PIN_GREEN, HIGH);
        digitalWrite(PIN_WHITE, HIGH);
      } else if (pin != PIN_NONE) {
        Serial.print("Setting pin: ");
        Serial.println(pin, DEC);
        digitalWrite(pin, HIGH);
      }
    } 
  }
}
