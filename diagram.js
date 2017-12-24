var diagram = {
    draw: function (params) {
        this.params = params;
        var outerRad = this.params.outerRad;

        var that = this;
        var totalData = params.data.reduce(function (sum, current) {
            return sum + current;
        });
        var result = '<svg width="' + (outerRad * 2) + '" height="' + (outerRad * 2) + '" xmlns="http://www.w3.org/2000/svg">';
        var prevDeg = 0;
        var deg;

        params.data.forEach(function (v) {
            deg = prevDeg + (v * 360 / totalData);

            result += that.getPath(prevDeg, deg);

            prevDeg = deg;
        });

        result += '</svg>';

        return result;
    },

    getPath: function (from, to) {
        var html = '<path d="';
        var lower = 0;
        var outerRad = this.params.outerRad;
        var innerRad = this.params.innerRad;
        var outerArc = this.getArc(outerRad, from, to);
        var innerArc = this.getArc(innerRad, from, to);

        if (Math.abs(from - to) > 180) {
            lower = 1;
        }

        html += 'M' + outerArc.from.x + ',' + outerArc.from.y;
        html += 'A' + outerRad + ',' + outerRad + ' 0 ' + lower + ',1 ' + outerArc.to.x + ',' + outerArc.to.y;
        html += 'L' + innerArc.to.x + ',' + +innerArc.to.y;
        html += 'A' + innerRad + ',' + innerRad + ' 0 ' + lower + ',0 ' + innerArc.from.x + ',' + innerArc.from.y;
        html += 'L' + outerArc.from.x + ',' + outerArc.from.y;
        html += '" fill="' + this.getRandomColor() + '" />';

        return html;

    },

    getArc: function (r, from, to) {
        return {
            from: this.getXY(r, from),
            to: this.getXY(r, to)
        };
    },

    getXY: function (rad, deg) {
        return {
            x: this.params.outerRad + rad * Math.cos(deg * Math.PI / 180),
            y: this.params.outerRad + rad * Math.sin(deg * Math.PI / 180)
        };
    },

    getRandomColor: function () {
        var color = [];

        for (var i = 0; i < 3; i++) {
            color.push(Math.floor(Math.random() * 255));
        }

        return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    }
};

document.addEventListener('DOMContentLoaded', function () {
    document.body.innerHTML += diagram.draw({
        data: [20, 20, 30, 123],
        outerRad: 140,
        innerRad: 55
    });
});
