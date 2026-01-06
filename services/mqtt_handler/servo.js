const mqtt = require('mqtt');
const {getIO} = require('../socket.service');
const Device = require('../../models/device.model');
const SensorData = require('../../models/sensordata.model');
const servoHelper = async (action, data) => {
    const deviceName = data.device;
    const sensorType = 'servo';
    const state = data.value;
    const device = await Device.findOne({ name: deviceName });
    if (!device) return;
    const sensordata = new SensorData({
        deviceName,
        device_id: device._id,
        sensorType,
        string_value: state,
        unit: 'state',
    });
    await sensordata.save();

    const io = getIO();
    io.emit('servo', {
        deviceName,
        sensorType,
        value: state,
        unit: 'state',
        timestamp: sensordata.timestamp
    });
};

module.exports = { servoHelper };