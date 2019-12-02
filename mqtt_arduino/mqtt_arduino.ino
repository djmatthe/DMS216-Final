#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include <ArduinoJson.h>
#include "sensor.h"

#define PLAYER_NUM "Player4"

#define LED_STATE_STR PLAYER_NUM "/ledState"
#define IR_STATE_STR PLAYER_NUM "/irState"

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
Adafruit_MQTT_Publish test = Adafruit_MQTT_Publish(&mqtt, PLAYER_NUM);
Adafruit_MQTT_Subscribe ledSub = Adafruit_MQTT_Subscribe(&mqtt, LED_STATE_STR);
Adafruit_MQTT_Subscribe irSendSub = Adafruit_MQTT_Subscribe(&mqtt, IR_STATE_STR);

/*************************** Sketch Code ************************************/

void ledCallback(uint32_t pattern) {
  Serial.println("Got pattern");
  Serial.println(pattern);
  setPixelPattern(pattern);
}

void irCallback(uint32_t code) {
  Serial.println("Got ir code");
  Serial.println(code);
  sendIRData(code);
}

void setup() {
  Serial.begin(115200);
  delay(10);

  //Setup sensors
  setupSensors();

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

  client.setFingerprint(fingerprint);

  ledSub.setCallback(ledCallback);
  irSendSub.setCallback(irCallback);

  mqtt.subscribe(&ledSub);
  mqtt.subscribe(&irSendSub);
}

void sendButtonPress() {
  char outputBuffer[128];
  StaticJsonDocument<200> doc;
  doc["buttonState"] = getPushButtonPressed();
  doc["tiltState"] = getTilted();
  doc["irSensor"] = getMostRecentPressedRemote();
  serializeJson(doc, outputBuffer);
  test.publish(outputBuffer);
}

void loop() {
  MQTT_connect();
  sensorLoop();
  sendButtonPress();
  
  mqtt.processPackets(10000);
  if(!mqtt.ping()) {
    mqtt.disconnect();
  }
}

void MQTT_connect() {
  int8_t ret;

  if (mqtt.connected()) {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {
       Serial.println(mqtt.connectErrorString(ret));
       Serial.println("Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);
       retries--;
       if (retries == 0) {
         while (1);
       }
  }

  Serial.println("MQTT Connected!");
}
