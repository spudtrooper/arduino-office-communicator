# Requirements:
#
#  http://pypi.python.org/pypi/pyserial

import serial

# Global serial port
serialPort = None

def serialInit():
    """
    Sets up serial connection and returns the device name
    """
    global serialPort
    serialPortStr = findSerialPort()
    serialPort = serial.Serial(serialPortStr, 9600)
    print 'Using serial port: %s - %s' % (serialPortStr,(serialPort is not None))
    return serialPortStr

def serialSend(n):
    """
    Sends a byte to the serial port 'serialPort'
    """
    global serialPort
    c = chr(int(n))
    print 'Sending serial %d - %r' % (n,c)
    serialPort.write(c)

def findSerialPort():
    return '/dev/tty.usbmodem411'
