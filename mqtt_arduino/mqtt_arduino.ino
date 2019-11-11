/***************************************************
  Adafruit MQTT Library ESP8266 Adafruit IO SSL/TLS example

  Must use the latest version of ESP8266 Arduino from:
    https://github.com/esp8266/Arduino

  Works great with Adafruit's Huzzah ESP board & Feather
  ----> https://www.adafruit.com/product/2471
  ----> https://www.adafruit.com/products/2821

  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Tony DiCola for Adafruit Industries.
  SSL/TLS additions by Todd Treece for Adafruit Industries.
  MIT license, all text above must be included in any redistribution
 ****************************************************/
#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include <ArduinoJson.h>
#include "Adafruit_NeoPixel.h"

/************************* WiFi Access Point *********************************/

#define WLAN_SSID       "UB_Connect"
#define WLAN_PASS       ""

/************************* Adafruit.io Setup *********************************/

#define AIO_SERVER      "mqtt.drewwilliams.dev"
// Using port 8883 for MQTTS
#define AIO_SERVERPORT  8883
// Adafruit IO Account Configuration
// (to obtain these values, visit https://io.adafruit.com and click on Active Key)
#define AIO_USERNAME    "drew"
#define AIO_KEY         "dms216"

/************ Global State (you don't need to change this!) ******************/

// WiFiFlientSecure for SSL/TLS support
WiFiClientSecure client;

// Setup the MQTT client class by passing in the WiFi client and MQTT server and login details.
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// io.adafruit.com SHA1 fingerprint
static const char *fingerprint PROGMEM = "5E 5A 01 E5 59 B7 FC DB F5 90 D4 A2 EE 8D DC B9 5E B1 77 BF";

/****************************** Feeds ***************************************/

// Setup a feed called 'test' for publishing.
// Notice MQTT paths for AIO follow the form: <username>/feeds/<feedname>
Adafruit_MQTT_Publish test = Adafruit_MQTT_Publish(&mqtt, "outTopic");
Adafruit_MQTT_Publish buttonPub = Adafruit_MQTT_Publish(&mqtt, "buttonState");
Adafruit_MQTT_Subscribe ledSub = Adafruit_MQTT_Subscribe(&mqtt, "ledState");


/*************************** PINS ************************************/

#define NEO_PIXEL_DATA 12
#define BTN_PIN 14
#define NUM_OF_PIXELS 1

/*************************** Variables ************************************/

Adafruit_NeoPixel strip(NUM_OF_PIXELS, NEO_PIXEL_DATA, NEO_GRB + NEO_KHZ800);

bool buttonState = false;
bool lastButtonState = false;
bool buttonStateToSend = false;

/*************************** Sketch Code ************************************/

void ledCallback(int mode) {
  switch(mode) {
    case 0:
      strip.setPixelColor(0, 0, 0, 0);
      break;
    case 1:
      strip.setPixelColor(0, 255, 255, 255);
    case 2:
      strip.setPixelColor(0, 255, 0, 0);
  }
  strip.show();
}

void setup() {
  pinMode(BTN_PIN, INPUT);


  Serial.begin(115200);
  delay(10);

  Serial.println(F("Adafruit IO MQTTS (SSL/TLS) Example"));

  // Connect to WiFi access point.
  Serial.println(); Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  delay(1000);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  delay(2000);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.println("WiFi connected");
  Serial.println("IP address: "); Serial.println(WiFi.localIP());

  // check the fingerprint of io.adafruit.com's SSL cert
  client.setFingerprint(fingerprint);

  ledSub.setCallback(ledCallback);
  
  mqtt.subscribe(ledSub);
  
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
}

void sendButtonPress() {
  char outputBuffer[128];
  bool buttonState = digitalRead(BTN_PIN);

  if(buttonState != lastButtonState) {
    if(buttonState == HIGH) {
      buttonStateToSend = true;

    }
    else {
      buttonStateToSend = false;
    }
    delay(50);
  }

  lastButtonState = buttonState;

  StaticJsonDocument<200> doc;

  doc["buttonState"] = buttonStateToSend;

  serializeJson(doc, outputBuffer);

  test.publish(outputBuffer);
}


uint32_t x=0;

void loop() {
  // Ensure the connection to the MQTT server is alive (this will make the first
  // connection and automatically reconnect when disconnected).  See the MQTT_connect
  // function definition further below.
  MQTT_connect();

  sendButtonPress();

  // Now we can publish stuff!
  /*Serial.print(F("\nSending val "));
  Serial.print(x);
  Serial.print(F(" to test feed..."));
  if (! test.publish(x++)) {
    Serial.println(F("Failed"));
  } else {
    Serial.println(F("OK!"));
  }*/

  // wait a couple seconds to avoid rate limit
  //delay(2000);

}

// Function to connect and reconnect as necessary to the MQTT server.
// Should be called in the loop function and it will take care if connecting.
void MQTT_connect() {
  int8_t ret;

  // Stop if already connected.
  if (mqtt.connected()) {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) { // connect will return 0 for connected
       Serial.println(mqtt.connectErrorString(ret));
       Serial.println("Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);  // wait 5 seconds
       retries--;
       if (retries == 0) {
         // basically die and wait for WDT to reset me
         while (1);
       }
  }

  Serial.println("MQTT Connected!");
}
