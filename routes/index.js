const router = require('express').Router();
const sensorController = require('../controllers/sensor.controller');

// Endpoint to change sensor status
router.post('/sensor/change-status', async (req, res) => {
    try {
        const { deviceName, sensorType, value } = req.body;
        await sensorController.changeSensorStatus(deviceName, sensorType, value);
        res.status(200).json({ message: 'Sensor status changed successfully' });
    } catch (error) {
        console.error('Error changing sensor status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/sensor/get-latest/:deviceName', async (req, res) => {
    try {
        const { deviceName } = req.params;
        const sensorData = await sensorController.getLatestSensorData(deviceName);
        if (!sensorData) {
            return res.status(404).json({ message: 'No data found for the specified device and sensor type' });
        }
        res.status(200).json(sensorData);
    } catch (error) {
        console.error('Error fetching latest sensor data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/all-devices', async (req, res) => {
    try {
        const devices = await sensorController.getAllDevices();
        res.status(200).json(devices);
    } catch (error) {
        console.error('Error fetching all devices:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/sensor-data/history/:deviceName', async (req, res) => {
    try {
        const { deviceName } = req.params;
        const history = await sensorController.getSensorDataHistory(deviceName);
        res.status(200).json(history);
    } catch (error) {
        console.error('Error fetching sensor data history:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;