// Инициализация карты (всё заполняем стенами)
function initMap() {
    for (var y = 0; y < MAP_HEIGHT; y++) {
        map[y] = [];
        for (var x = 0; x < MAP_WIDTH; x++) {
            map[y][x] = TILE_WALL;
        }
    }
}

function initMapEnemies() {
    mapEnemies = [];
    for (var y = 0; y < MAP_HEIGHT; y++) {
        mapEnemies[y] = [];
        for (var x = 0; x < MAP_WIDTH; x++) {
            mapEnemies[y][x] = TILE_EMPTY;
        }
    }
}

function placeRooms() {
    var rooms = [];
    var roomCount = getRandom(5, 10);
    for (var i = 0; i < roomCount; i++) {
        createRoom(rooms);
    }
}

function createRoom(rooms) {
    var roomWidth, roomHeight, roomX, roomY;
    var overlap = false;
    var hasRoad = false;

    do {
        roomHeight = getRandom(3, 8);
        roomWidth = getRandom(3, 8);
        roomY = getRandom(0, MAP_HEIGHT - roomHeight);
        roomX = getRandom(0, MAP_WIDTH - roomWidth);
        hasRoad = false;
        overlap = isRoomOverlap(roomX, roomY, roomWidth, roomHeight, rooms)

        // Проверяем, примыкает ли комната к дороге/комнате
        if (!overlap) {
            hasRoad = isInTouchRoad(roomX, roomY, roomWidth, roomHeight);
        }

    } while ((overlap || !hasRoad));

    for (var y = roomY; y < roomY + roomHeight; y++) {
        for (var x = roomX; x < roomX + roomWidth; x++) {
            map[y][x] = TILE_FLOOR;
        }
    }
    rooms.push({x: roomX, y: roomY, width: roomWidth, height: roomHeight});

}

function isRoomOverlap(x1, y1, w1, h1, rooms) {
    for (var i = 0; i < rooms.length; i++) {
        var existingRoom = rooms[i];
        var x2 = existingRoom.x;
        var y2 = existingRoom.y;
        var w2 = existingRoom.width;
        var h2 = existingRoom.height;
        if (!(x1 + w1 < x2 ||  // Левая сторона первой комнаты за правой стороной второй
            x2 + w2 < x1 ||  // Левая сторона второй комнаты за правой стороной левой
            y1 + h1 < y2 ||  // Верх первой комнаты за низом второй
            y2 + h2 < y1)) { // Верх второй комнаты за низом первой
            return true;
        }
    }
    return false;
}

function isInTouchRoad(roomX, roomY, roomWidth, roomHeight) {
    for (var x = roomX; x < roomX + roomWidth; x++) {
        if (roomY - 1 >= 0 && map[roomY - 1][x] === TILE_FLOOR) return true;
        if (roomY + roomHeight < MAP_HEIGHT && map[roomY + roomHeight][x] === TILE_FLOOR) return true;
    }

    for (var y = roomY; y < roomY + roomHeight; y++) {
        if (roomX - 1 >= 0 && map[y][roomX - 1] === TILE_FLOOR) return true;
        if (roomX + roomWidth < MAP_WIDTH && map[y][roomX + roomWidth] === TILE_FLOOR) return true;
    }
    return false;
}

function placeRoad() {
    generateRoads(getRandom(3, 5), MAP_WIDTH, createRoadX);
    generateRoads(getRandom(3, 5), MAP_HEIGHT, createRoadY);
}

function generateRoads(count, size, createRoad) {
    var roadsArray = [];
    for (var i = 0; i < count; i++) {
        var coordinate = 0;
        do {
            coordinate = getRandom(0, size - 1);
        } while (roadsArray.includes(coordinate) || roadsArray.includes(coordinate - 1) || roadsArray.includes(coordinate + 1))
        roadsArray.push(coordinate);
        createRoad(coordinate);
    }
}

function createRoadX(x) {
    for (var y = 0; y < MAP_HEIGHT; y++) {
        map[y][x] = TILE_FLOOR;
    }
}

function createRoadY(y) {
    for (var x = 0; x < MAP_WIDTH; x++) {
        map[y][x] = TILE_FLOOR;
    }
}
