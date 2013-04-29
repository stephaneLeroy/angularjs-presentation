var module = angular
    .module('animateApp', [])
    .directive('superBall', function ($timeout) {
        return {
            restrict:'E',
            link:function (scope, element, attrs) {
                element.addClass('circle');

                scope.$watch(attrs.x, function (x) {
                    element.css('left', x + 'px');
                });
                scope.$watch(attrs.y, function (y) {
                    element.css('top', y + 'px');
                });
                scope.$watch(attrs.color, function (color) {
                    element.css('backgroundColor', color);
                });
            }
        };
    });

function animator(shapes, $timeout) {
    (function tick() {
        var i;
        var now = new Date().getTime();
        var maxX = 600;
        var maxY = 400;
        var now = new Date().getTime();

        for (i = 0; i < shapes.length; i++) {
            var shape = shapes[i];
            var elapsed = (shape.timestamp || now) - now;

            shape.timestamp = now;
            shape.x += elapsed * shape.velX / 1000;
            shape.y += elapsed * shape.velY / 1000;

            if (shape.x > maxX) {
                shape.x = 2 * maxX - shape.x;
                shape.velX *= -1;
            }
            if (shape.x < 300) {
                shape.x = 300;
                shape.velX *= -1;
            }

            if (shape.y > maxY) {
                shape.y = 2 * maxY - shape.y;
                shape.velY *= -1;
            }
            if (shape.y < 320) {
                shape.y = 320;
                shape.velY *= -1;
            }
        }

        $timeout(tick, 30);
    })();
}

function AnimateCtrl($scope, $timeout) {

    function buildShape() {
        var maxVelocity = 200;
        return {
            color:'#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            x:Math.min(300, Math.max(325, (Math.random() * 300))),
            y:Math.min(320, Math.max(325, (Math.random() * 320))),

            velX:(Math.random() * maxVelocity),
            velY:(Math.random() * maxVelocity)
        };
    }

    ;

    // Publish list of shapes on the $scope/presentationModel
    // Then populate the list with 100 shapes randomized in position
    // and color
    $scope.shapes = [];
    for (i = 0; i < 1; i++) {
        $scope.shapes.push(buildShape());
    }
    $scope.add = function() {
        $scope.shapes.push(buildShape());
    }
    $scope.remove = function() {
        $scope.shapes.pop(buildShape());
    }

    // Start timer-based, changes of the shape properties
    animator($scope.shapes, $timeout);

}