
// Инициализация карты (всё заполняем стенами)
function initMap() {
    for (var y = 0; y < mapHeight; y++) {
        map[y] = [];
        for (var x = 0; x < mapWidth; x++) {
            map[y][x] = TILE_WALL;
        }
    }
}

// Создание и размещение комнат
function placeRooms() {
    var rooms = [];
    var roomCount = getRandom(5, 10);
    for (var i = 0; i < roomCount; i++) {
        createRoom(rooms);
    }
}

// Генерация комнат
function createRoom(rooms) {
    var roomWidth, roomHeight, roomX, roomY;
    var overlap = false;
    var hasRoad = false;

    do {
        roomHeight = getRandom(3, 8);
        roomWidth = getRandom(3, 8);
        roomY = getRandom(0, mapHeight - roomHeight);
        roomX = getRandom(0, mapWidth - roomWidth);
        overlap = false;
        hasRoad = false;

        // Проверка на пересечение с другими комнатами
        for (var i = 0; i < rooms.length; i++) {
            var existingRoom = rooms[i];
            if (isRoomOverlap(roomX, roomY, roomWidth, roomHeight, existingRoom.x, existingRoom.y, existingRoom.width, existingRoom.height)) {
                overlap = true;
                break;
            }
        }

        // Проверяем, примыкает ли комната к дороге/комнате
        if (!overlap) {
            hasRoad = isInTouchRoad(roomX, roomY, roomWidth, roomHeight);
        }

    } while ((overlap || !hasRoad));

    if (!overlap && hasRoad) {
        for (var y = roomY; y < roomY + roomHeight; y++) {
            for (var x = roomX; x < roomX + roomWidth; x++) {
                map[y][x] = TILE_ROOM;
            }
        }
        rooms.push({x: roomX, y: roomY, width: roomWidth, height: roomHeight});
    }
}

// проверка на пересечение комнат
function isRoomOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(x1 + w1 < x2 ||  // Левая сторона первой комнаты за правой стороной второй
        x2 + w2 < x1 ||  // Левая сторона второй комнаты за правой стороной левой
        y1 + h1 <= y2 ||  // Верх первой комнаты за низом второй
        y2 + h2 <= y1);   // Верх второй комнаты за низом первой
}

// Функция для проверки, примыкает ли комната к дороге/комнате
function isInTouchRoad(roomX, roomY, roomWidth, roomHeight) {
    for (var x = roomX; x < roomX + roomWidth; x++) {
        if (roomY - 1 >= 0 && map[roomY - 1][x] === TILE_FLOOR) return true;
        if (roomY + roomHeight < mapHeight && map[roomY + roomHeight][x] === TILE_FLOOR) return true;
    }

    for (var y = roomY; y < roomY + roomHeight; y++) {
        if (roomX - 1 >= 0 && map[y][roomX - 1] === TILE_FLOOR) return true;
        if (roomX + roomWidth < mapWidth && map[y][roomX + roomWidth] === TILE_FLOOR) return true;
    }
    return false;
}

// Создание и размещение дорог
function placeRoad() {
    generateRoads(getRandom(3, 5), mapWidth, createRoadX, []);
    generateRoads(getRandom(3, 5), mapHeight, createRoadY, []);
}

// Общая функция для генерации дорог
function generateRoads(count, size, createRoad, roadsArray) {
    for (var i = 0; i < count; i++) {
        var coordinate = 0;
        do {
            coordinate = getRandom(0, size - 1);
        } while (roadsArray.includes(coordinate) || roadsArray.includes(coordinate - 1) || roadsArray.includes(coordinate + 1))
        roadsArray.push(coordinate);
        createRoad(coordinate);
    }
}

// Генерация дорог
function createRoadX(x) {
    for (var y = 0; y < mapHeight; y++) {
        map[y][x] = TILE_FLOOR;
    }
}

function createRoadY(y) {
    for (var x = 0; x < mapWidth; x++) {
        map[y][x] = TILE_FLOOR;
    }
}
