#!/usr/bin/env python
#
# Sends what you type to the serial port.  For testing.
#

import sys
import re
import os

from common import *

def main(argv):
    serialInit()
    while True:
        str = raw_input('[0-9|q]> ')
        if re.match(r'q',str):
            break
        try:
            serialSend(int(str))
        except:
            pass

if __name__ == '__main__':
    main(sys.argv)
