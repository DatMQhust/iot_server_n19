const mqtt = require('mqtt');
const { getIO } = require('./socket.service');

const connectMQTT = () => {
  console.log('Starting MQTT Service...');
  console.log('MQTT Broker URL:', process.env.MQTT_BROKER_URL);
  
  // Tạo URL kết nối đầy đủ
  const brokerUrl = `mqtts://${process.env.MQTT_BROKER_URL || 'localhost'}:${process.env.MQTT_PORT || 1883}`;
  
  const options = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000, // Tự động kết nối lại sau 1 giây
  };

  console.log('Connecting to:', brokerUrl);
  const client = mqtt.connect(brokerUrl, options);

  client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    client.subscribe('btl_iot_n19/#', (err) => {
      if (err) {
        console.error('Failed to subscribe to topic:', err);
      } else {
        console.log('Subscribed to topic: btl_iot_n19/#');
      }
    });
  });

  client.on('error', (err) => {
    console.error('MQTT Connection Error:', err.message);
  });

  client.on('offline', () => {
    console.log('MQTT Client is offline');
  });

  client.on('reconnect', () => {
    console.log('Reconnecting to MQTT Broker...');
  });

  client.on('message', (topic, message) => {
    const payload = message.toString();
    console.log(`Received message on ${topic}: ${payload}`);
    const io = getIO();
    io.emit('mqtt_message', { topic, payload });
  });
};

module.exports = connectMQTT;