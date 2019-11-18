#include <Adafruit_NeoPixel.h>
#include <IRremoteESP8266.h>
#include <IRrecv.h>
#include <IRutils.h>

//PINS
#define NEO_PIXEL_PIN 14
#define BUTTON_PIN 12
#define IR_SENSOR_PIN 13
#define TILT_SENSOR_PIN 4
#define BUZZER_PIN 5
#define SPEAKER_PIN 17

//CONSTANTS
#define LED_COUNT 1
#define NEO_PIXEL_BRIGHTNESS 255

unsigned long lastDebounceTimeButton = 0;
unsigned long lastDebounceTimeTilt = 0;
unsigned long debounceDelay = 50;

//DEVICE VARIABLES
Adafruit_NeoPixel neoPixel(LED_COUNT, NEO_PIXEL_PIN, NEO_GRB + NEO_KHZ800);
IRrecv reciever(IR_SENSOR_PIN);
decode_results reciever_results;

//STATE VARIABLES
int buttonState;
int lastButtonState = LOW;
int buttonStateToRead = LOW;

int tiltState;
int lastTiltState = LOW;
int tiltStateToRead = LOW;

static char remoteMostRecentPressed[10];

void debounceButton() {
  int reading = digitalRead(BUTTON_PIN);
  if(reading != lastButtonState) {
    lastDebounceTimeButton = millis();
  }
  if((millis() - lastDebounceTimeButton) > debounceDelay) {
    if(reading != buttonState) {
      buttonState = reading;
      if(buttonState == HIGH) {
        buttonStateToRead = !buttonStateToRead;
      }
    }
  }
  lastButtonState = reading;
}

void debounceTilt() {
  int reading = digitalRead(TILT_SENSOR_PIN);
  if(reading != lastTiltState) {
    lastDebounceTimeTilt = millis();
  }
  if((millis() - lastDebounceTimeTilt) > debounceDelay) {
    if(reading != tiltState) {
      tiltState = reading;
      if(tiltState == HIGH) {
        tiltStateToRead = !tiltStateToRead;
      }
    }
  }
  lastTiltState = reading;
}

bool getPushButtonState() {
  return buttonStateToRead;
}

bool getPushButtonPressed() {
  return digitalRead(BUTTON_PIN);
}

bool getTiltState() {
  return tiltStateToRead;
}

bool getTilted() {
  return digitalRead(TILT_SENSOR_PIN);
}

void setBuzzer(bool onOff) {
  if(onOff) {
    digitalWrite(BUZZER_PIN, HIGH);
  }
  else {
    digitalWrite(BUZZER_PIN, LOW);
  }
}

void setPixelPattern(int pattern) {
  unsigned char r = 0;
  unsigned char g = 0;
  unsigned char b = 0;
  switch(pattern) {
    case 0:
      r = 0, g = 0, b = 0;
      break;
    case 1:
      r = 255, g = 255, b = 255;
      break;
    case 2:
      r = 255, g = 0, b = 0;
      break;
    default:
      Serial.println("LED PATTERN NOT VALID. TURNING OFF!");
      r = 0, g = 0, b = 0;
      break;
  }
  neoPixel.setPixelColor(0, r, g, b);
  neoPixel.show();
}

void readIRSensor() {
  if(reciever.decode(&reciever_results)) {
    serialPrintUint64(reciever_results.value, HEX);
    sprintf(remoteMostRecentPressed, "%lld", reciever_results.value);
    Serial.println("");
    reciever.resume();
  }
  delay(100);
}

char* getMostRecentPressedRemote() {
  return remoteMostRecentPressed;
}

void sensorLoop() {
  debounceButton();
  debounceTilt();
  readIRSensor();
}

void setupSensors() {  
  pinMode(BUTTON_PIN, INPUT);
  pinMode(IR_SENSOR_PIN, INPUT);
  pinMode(TILT_SENSOR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  neoPixel.setBrightness(NEO_PIXEL_BRIGHTNESS);
  neoPixel.begin();
  neoPixel.show();

  setPixelPattern(0);

  reciever.enableIRIn();

  Serial.println("Setup sensors done.");
}
