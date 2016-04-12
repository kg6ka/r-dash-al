class SpeedoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: props.percent,
      message: props.message,
      endAngle: Math.PI * (props.percent - 0.5),
    };

    this.duration = 1000;
    this.startAngle = -90 * (Math.PI / 180);
    this.height = this.props.size.height;
    this.scaleHeight = this.height * 0.4;

    this.gradientArc = d3.svg.arc()
      .startAngle(this.startAngle)
      .innerRadius(this.height / 8)
      .outerRadius(this.height / 4);

    this.arc = d3.svg.arc()
      .startAngle(this.startAngle)
      .innerRadius(this.scaleHeight * 1.1)
      .outerRadius(this.scaleHeight * 1.09);
  }

  componentWillReceiveProps(nextProps) {
    this.tweenArc(this.props.percent, nextProps.percent, 'arc');
    this.tweenArc(this.props.percent, nextProps.percent, 'gradientArc');
    this.tweenNeedle(this.props.percent);

    this.setState({
      endAngle: nextProps.percent * Math.PI + this.startAngle,
      percent: nextProps.percent,
    });
  }

  drawScale() {
    return (
      <g className={'scale'}>
        <line
          className={'bottomLine'}
          stroke="#747779"
          strokeWidth={3}
          x1={0}
          y1={this.height}
          x2={this.height}
          y2={this.height}
        >
        </line>
        { this.drawNotch() }
      </g>
    );
  }

  drawNotch() {
    let scaleDegree = -180;
    const translateString = 'translate(' + this.height / 2 + ', ' + (this.height - 2) + ')';
    const props = [];
    for (let i = 0; i <= 20; i++) {
      const ratio = i % 4 ? 0.35 : 0.3;
      const degree = scaleDegree;
      scaleDegree += 180 / 20;
      props.push({ ratio, degree });
    }
    return props.map((el, idx) =>
      <line
        key={idx}
        className={'notch'}
        stroke="#fff"
        strokeWidth={this.height / 200}
        x1={this.height * el.ratio}
        y1={0}
        x2={this.scaleHeight}
        y2={0}
        transform={translateString + 'rotate(' + el.degree + ')'}
      ></line>
    );
  }

  drawNeedle() {
    const translateString = 'translate(' + this.height / 2 + ', ' + this.height + ')';
    const degree = -90 + this.state.percent * 100 * 1.8;
    return (
      <line
        className={'needle'}
        stroke="#c61037"
        strokeWidth={3}
        x1={0}
        y1={-this.height / 2}
        x2={0}
        y2={0}
        transform={translateString + 'rotate(' + degree + ')'}
      >
      </line>
    );
  }

  tweenNeedle(percent) {
    var translateString = 'translate(' + this.height / 2 + ', ' + this.height + '), ';
    d3.select('.needle')
      .transition()
      .duration(this.duration)
      .attrTween('transform', function () {
        const degree = -90 + percent * 100 * 1.8;
        return d3.interpolateString(
          translateString + 'rotate(' + degree + ')', d3.select(this).attr('transform'));
      });
  }

  drawArc(name) {
    const translateString = 'translate(' + this.height / 2 + ', ' + (this.height - 2) + ')';
    return (
      <path
        className={name}
        d={this[name].endAngle(this.state.endAngle)()}
        fill={'#8f9295'}
        transform={translateString}
      >
      </path>
    );
  }

  tweenArc(oldPerc, currPerc, name) {
    d3.select('.' + name)
      .transition()
      .duration(this.duration)
      .call(arcTween);

    const self = this;
    function arcTween(transition) {
      transition.attrTween('d', () => {
        const currentAngle = oldPerc * Math.PI + self.startAngle;
        const newAngle = currPerc * Math.PI + self.startAngle;
        const interpolate = d3.interpolate(currentAngle, newAngle);
        return function (t) {
          return self[name].endAngle(interpolate(t))();
        };
      });
    }
  }

  drawText() {
    const lables = this.state.message.toUpperCase().split(' ');
    const percent = Math.round(this.state.percent * 100);
    let koef;
    if (percent < 100) {
      if (percent < 10) {
        koef = 1;
      } else {
        koef = 2;
      }
    } else {
      koef = 3;
    }
    const percentWidth = (0.23 * this.height - 0.5) * koef;

    return (
      <g>
        { this.partOfText(this.height * 0.95, this.height * 2 / 3, 'modeka', this.height * 0.45, percent) }
        { this.partOfText(percentWidth + this.height * 0.95, this.height / 2, 'modeka', this.height * 0.45 / 2, '%') }
        { lables.map((elem, idx) => {
          return this.partOfText(percentWidth + this.height * 0.95 + 0.2 * this.height,
            idx === 0 ? this.height * 0.45 : this.height * 0.63,
            'Telegrafico',
            this.height / 5,
            elem,
            idx);
        }) }
      </g>
    );
  }

  partOfText(x, y, fontFamily, fontSize, text, idx) {
    return (
      <text
        key={idx}
        x={x}
        y={y}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fill={'#fff'}
    >
        {text}
      </text>
    );
  }

  render() {
    const { size: { height, width } } = this.props;
    const offsetXr = -Math.sin(50 * Math.PI / 180) * (this.height - this.scaleHeight);
    const offsetYr = Math.cos(50 * Math.PI / 180) * (this.height - this.scaleHeight);
    const offsetYc = Math.cos(50 * Math.PI / 180) * (this.height - this.scaleHeight) / 3;
    const translateString = 'translate(' + offsetXr + ', ' + (offsetYr - offsetYc) + '), ';
    return (
      <svg height={ height } width={ width }>
        <linearGradient id="gradient">
          <stop offset='0%' stopColor='#000' />
          <stop offset="100%" stopColor='#fba120' />
        </linearGradient>
        <g
          className={'speedo'}
          transform={translateString + 'rotate(-50)'}
    >
          { this.drawScale() }
          { this.drawNeedle()}
          { this.drawArc('arc') }
          { this.drawArc('gradientArc') }
        </g>
        { this.drawText() }
      </svg>
    );
  }
}

window.SpeedoComponent = SpeedoComponent;
