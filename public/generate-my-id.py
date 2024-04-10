def generateMyID(zip, key):
    symbol_mapper = {
    1: '!',
    2: '@',
    3: '^',
    4: '$',
    5: '%',
    6: '#',
    7: '&'
    }
    
    id = []
    id.append(chr(int(zip[1]+zip[1]+zip[1])))
    id.append(zip[-1])
    id.append(symbol_mapper[int(key[0])])
    id.append(key[-1])
    id.append(chr(38*int(zip[0])))
    id.append(zip[0])
    
    return ''.join(id)