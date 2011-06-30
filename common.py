# Requirements:
#
#  http://pypi.python.org/pypi/pyserial

import serial
import glob
import os

# Global serial port
serialPort = None

def serialInit(serialPortStr=None):
    """
    Sets up serial connection and returns the device name
    """
    global serialPort
    if serialPortStr is None:
        serialPortStr = findSerialPort()
    serialPort = serial.Serial(serialPortStr, 9600)
    print 'Using serial port: %s - %s' % (serialPortStr,(serialPort is not None))
    return serialPortStr

def serialSend(n):
    """
    Sends a byte to the serial port 'serialPort'
    """
    global serialPort
    c = chr(int(n) + 48)
    print 'Sending serial %d - %r' % (n,c)
    serialPort.write(c)

def findSerialPort():
    """
    TODO: This probably has to change
    """
    if os.name == 'windows':
        return 'COM5'
    if os.name == 'posix':
        for port in glob.glob('/dev/tty*usb*') + glob.glob('/dev/ttyUSB*'):
            return port
