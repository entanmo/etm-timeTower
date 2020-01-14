import React from 'react';
import { Row, Col, Button } from 'antd';

import './style/index.less';

import intl from 'react-intl-universal';


class Section extends React.Component {
    constructor(){
      super()
    }
    componentDidMount(){
      this.updateCanvas()
    }
    updateCanvas(){
      let self = this
    ! function () {
        function n(n, e, t) {
          return n.getAttribute(e) || t
        }

        function e(n) {
          return document.getElementsByTagName(n)
        }

        function t() {
          var t = e("script"),
            o = t.length,
            i = t[o - 1];
          return {
            l: o,
            z: n(i, "zIndex", -1),
            o: n(i, "opacity", .8),
            c: n(i, "color", "9cd9f9"),
            n: n(i, "count", 50)
          }
        }

        function o() {
          a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            c = m.height = 777
        }

        function i() {
          r.clearRect(0, 0, a, c);
          var n, e, t, o, m, l;

          s.forEach(function (i, x) {
              for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 2, 2), e = x + 1; e < u.length; e++) n = u[e],
                null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y,
                  l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m),
                    t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 1, r.strokeStyle = "rgba(" +"156,217,249" + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
            }),
            x(i)
        }

        var a, c, u, m = document.createElement("canvas"),
          d = t(),
          l = "c_n" + d.l,
          r = m.getContext("2d"),

          x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||

          function (n) {
            window.setTimeout(n, 1e3 / 45)
          },

          w = Math.random,
          y = {
            x: null,
            y: null,
            max: 2e4
          };
        m.id = l, m.style.cssText = "position:absolute;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o;
        self.refs.canvas.appendChild(m); o();
        window.onresize = o;

        self.refs.canvas.onmousemove = function (n) {
            const scrollTopHeight = document.documentElement.scrollTop || document.documentElement.scrollTop;
            const height = document.querySelector('.home-section1').offsetTop;
            n = n || window.event;
            y.x = n.clientX;

            if(scrollTopHeight<=height){
              y.y = n.clientY - (height - (scrollTopHeight -20) )
              console.log(y.y,n.screenY)
            } else {
              y.y = n.clientY + ((scrollTopHeight-20) - height )
            }
          },
          self.refs.canvas.onmouseout = function () {
            y.x = null, y.y = null
          };

        for (var s = [], f = 0; d.n > f; f++) {
          var h = w() * a,
            g = w() * c,
            v = 2 * w() - 1,
            p = 2 * w() - 1;
          s.push({
            x: h,
            y: g,
            xa: v,
            ya: p,
            max: 6e3
          })

        }

        u = s.concat([y]),
          setTimeout(function () {
            i()
          }, 100)
        }();
    }
    render() {
        const clsName = this.props.className + '-section1';
        const list = this.props.list
        return (
            <div className={clsName}>
                <div className='container qr'>
                <div className="canvas" ref="canvas"></div>
                <div className='content flex-vertical' >
                <img className='img-icon' src={list? list.icon : ''} alt=""/>
                <p className="title-text">{list? list.text:''}</p>
                <img className='img-title' src={list? list.title : ''} alt=""/>
                    <p className="info" >{list? list.info : ''}</p>
                    <p className="info" >{list? list.info1 : ''}</p>
                </div>
                </div>
            </div>
        )
    }

}

Section.defaultProps = {
    className: 'home',
}

export default Section;
