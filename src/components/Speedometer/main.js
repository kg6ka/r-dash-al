'use strict';

function Speedo(element) {
  {this.element = element;
    this.height = element.clientHeight;
    this.width = element.clientWidth;
    this.duration = 1000;
    this.startAngle = -90 * (Math.PI / 180);


    this.svg = d3.select(this.element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg.append('linearGradient')
      .attr('id', 'gradient')
      .selectAll('stop')
      .data([
        { offset: '0%', color: "#000" },
        { offset: '100%', color: "#fba120" }
      ])
      .enter().append('stop')
      .attr('offset', function (d) {
        return d.offset;
      })
      .attr('stop-color', function (d) {
        return d.color;
      });

    this.scaleHeight = this.height * .4;

    var offsetXr = -Math.sin(50 * Math.PI / 180) * (this.height - this.scaleHeight);
    var offsetYr = Math.cos(50 * Math.PI / 180) * (this.height - this.scaleHeight);
    var offsetYc = Math.cos(50 * Math.PI / 180) * (this.height - this.scaleHeight) / 3;
    // offsetYc = 0;
    // x = -r * sin (a)
    // y = r * cos (a)
    this.speedometer = this.svg
      .append('g')
      .attr('class', 'speedo')
      .attr('transform', 'translate(' + offsetXr + ', ' + (offsetYr - offsetYc) + '), rotate(-50)');
  }
  this.gradientArc = d3.svg.arc()
    .startAngle(this.startAngle)
    .innerRadius(this.height / 8)
    .outerRadius(this.height / 4);

  this.arc = d3.svg.arc()
    .startAngle(this.startAngle)
    .innerRadius(this.scaleHeight * 1.1)
    .outerRadius(this.scaleHeight * 1.09);

  this.drawScale();
}

Speedo.prototype = {
  constructor: Speedo,
  draw: function (value) {
    this.value = value;
    this.endAngle = this.value.percent * Math.PI + this.startAngle;

    this.drawArc('arca', 'arc');
    this.drawArc('gradient', 'gradientArc');
    this.drawNeedle();

  },
  drawArc: function (className, elem) {
    var self = this;
    this.speedometer.selectAll('.' + className)
      .data([this.value])
      .enter()
      .append('path')
      .attr('class', className)
      .attr('d', this[elem].endAngle(this.endAngle)())
      .attr('fill', '#8f9295')
      .attr('transform', 'translate(' + this.height / 2 + ', ' + (this.height - 1) + ')');

    this.speedometer.select('.' + className)
      .transition()
      .duration(this.duration)
      .call(arcTween);

    function arcTween(transition) {
      transition.attrTween('d', function (d) {
        this.oldPerc = this.oldPerc ? this.oldPerc : d.percent;
        var currentAngle = this.oldPerc * Math.PI + self.startAngle;
        var newAngle = d.percent * Math.PI + self.startAngle;
        var interpolate = d3.interpolate(currentAngle, newAngle);
        this.oldPerc = d.percent;
        self.drawText();

        return function (t) {
          return self[elem].endAngle(interpolate(t))();
        };
      });
    }
  },

  drawNeedle: function () {
    var translateString = 'translate(' + this.height / 2 + ', ' + this.height + '), ';
    this.speedometer.selectAll('.needle')
      .data([this.value])
      .enter()
      .append('line')
      .attr('class', 'needle')
      .attr('stroke', '#c61037')
      .attr('stroke-width', 3)
      .attr('x1', 0)
      .attr('y1', -this.height / 2)
      .attr('x2', 0)
      .attr('y2', 0)
      .attr('transform', function (d) {
        var degree = -90 + d.percent * 100 * 1.8;
        return translateString + 'rotate(' + degree + ')';
      });

    this.speedometer.select('.needle')
      .transition()
      .duration(this.duration)
      .attrTween('transform', function (d) {
        var degree = -90 + d.percent * 100 * 1.8;
        return d3.interpolateString(
          d3.select(this).attr('transform'), translateString + 'rotate(' + degree + ')');
      });
  },
  drawScale: function () {
    var scale = this.speedometer
      .append('g')
      .attr('class', 'scale');

    scale.append('line')
      .attr('class', 'bottom-line')
      .attr('x1', 0)
      .attr('y1', this.height)
      .attr('x2', this.height)
      .attr('y2', this.height)
      .style('stroke-width', 3)
      .style('stroke', '#747779');

    var scaleDegree = -180;
    for (var i = 0; i <= 20; i++) {
      var ratio = i % 4 ? 0.35 : 0.3;
      scale.append('line')
        .attr('x1', this.height * ratio)
        .attr('y1', 0)
        .attr('x2', this.scaleHeight)
        .attr('y2', 0)
        .style('stroke-width', this.height / 200)
        .style('stroke', '#fff')
        .attr('transform', 'translate(' + this.height / 2 + ', ' + (this.height - 2) + '), rotate(' + scaleDegree + ')');
      scaleDegree += 180 / 20;
    }
  },
  drawText: function () {
    var lables = this.value.msg.toUpperCase().split(' ');
    var percent = Math.round(this.value.percent * 100);
    var koef;
    var self = this;
    if (percent < 100) {
      if (percent < 10) {
        koef = 1;
      } else {
        koef = 2;
      }
    } else {
      koef = 3;
    }

    var percentWidth = (0.23 * this.height - 0.5) * koef;

    this.label ? this.svg.selectAll('.label').remove() : null;
    this.label = this.svg.selectAll('.label')
      .data([this.value])
      .enter();

    this.label.append('text')
      .attr('class', 'label')
      .text(percent)
      .attr('x', this.height * 0.95)
      .attr('y', this.height * 2 / 3)
      .style('font-family', 'modeka')
      .style('font-size', this.height * 0.45)
      .style('fill', '#fff');

    this.label.append('text')
      .attr('class', 'label')
      .text('%')
      .attr('x', percentWidth + this.height * 0.95)
      .attr('y', this.height / 2)
      .style('font-family', 'modeka')
      .style('font-size', this.height * 0.45 / 2)
      .style('fill', '#fff');

    lables.forEach(function (elem, idx) {
      self.label.append('text')
        .attr('class', 'label')
        .text(elem)
        .attr('x', percentWidth + self.height * 0.95 + 0.2 * self.height)
        .attr('y', idx === 0 ? self.height * 0.45 : self.height * 0.63)
        .style('font-family', 'Telegrafico')
        .style('font-size', self.height / 5)
        .style('fill', '#fff');
    });
  }
};
