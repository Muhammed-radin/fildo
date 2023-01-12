const canvas = {
  canvasElem: "NO_CANVAS_FOUND",
  canvasCtx: "NO_CTX_FOUND",
  store: [],
  idStorage: [],
  setWidth: function(w, h) {
    this.canvasElem.width = w;
    this.canvasElem.height = h;
  },
  setCanvas: function(elem) {
    if (elem) {
      canvas.canvasElem = elem;
      var ctx = canvas.canvasElem.getContext("2d");
      canvas.canvasCtx = ctx;

      return {
        elem: elem,
        ctx: ctx,
      };
    }
  },
  fillScreen: function() {
    this.setWidth(window.innerWidth, window.innerHeight);
    var myStyle = document.createElement("style");
    myStyle.innerHTML = `
        body {
            margin: 0;
            overflow: hidden;
        }
        ::-webkit-scrollbar {
            display: none;
        }
        `;
    document.head.appendChild(myStyle);
  },
  render: function() {
    var ctx = canvas.canvasCtx;

    this.store.forEach(function(data, dataIndex) {
      ctx.beginPath();

      switch (data.type) {
        case "rect":
          ctx.save();
          // ctx.transform(1,0,0,1,data.translate.x,data.translate.y)
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.strokeStyle = data.stroke;
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          data.afterClip ? ctx.clip() : null;
          ctx.rect(data.x, data.y, data.width, data.height);
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "circle":
          ctx.save();
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.strokeStyle = data.stroke;
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          ctx.arc(
            data.x,
            data.y,
            data.radius,
            0,
            Math.PI * data.arcLevel
          );
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "ellipse":
          ctx.save();
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          // ctx.rotate(data.rotate);
          ctx.strokeStyle = data.stroke;
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          ctx.ellipse(
            data.x,
            data.y,
            data.width,
            data.height,
            data.rotate,
            0,
            Math.PI * data.arcLevel
          );
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "text":
          ctx.save();
          ctx.font = data.fontSize + "px " + data.font;
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.strokeStyle = data.stroke;
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          ctx.fillText(data.text, data.x, data.y, data.textMax);
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "image":
          var img = new Image();
          img.src = data.imageURl;

          ctx.save();
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.strokeStyle = data.stroke;
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          data.imageSizeAuto == true ? ctx.drawImage(
            img,
            data.x,
            data.y,
            data.width,
            data.height,
          ) : ctx.drawImage(
            img,
            data.x,
            data.y,
            data.width,
            data.height,
            data.dx,
            data.dy,
            data.dWidth,
            data.dHeight
          );
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "line":
          ctx.save();
          // ctx.transform(1,0,0,1,data.translate.x,data.translate.y)
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.strokeStyle = data.stroke;
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          ctx.moveTo(data.x, data.y);
          ctx.lineTo(data.width, data.height);
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "quadraticLine":
          ctx.save();
          // ctx.transform(1,0,0,1,data.translate.x,data.translate.y)
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.strokeStyle = data.stroke;
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          ctx.moveTo(data.x, data.y);
          ctx.quadraticCurveTo(
            data.dx,
            data.dy,
            data.width,
            data.height
          );
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "bezierLine":
          ctx.save();
          // ctx.transform(1,0,0,1,data.translate.x,data.translate.y)
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.strokeStyle = data.stroke;
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          ctx.moveTo(data.x, data.y);
          ctx.bezierCurveTo(
            data.dx,
            data.dy,
            data.bx,
            data.by,
            data.width,
            data.height
          );
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "roundRect":
          ctx.save();
          // ctx.transform(1,0,0,1,data.translate.x,data.translate.y)
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.strokeStyle = data.stroke;
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          ctx.roundRect(
            data.x,
            data.y,
            data.width,
            data.height,
            Math.PI * data.arcLevel
          );
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
        case "clear":
          ctx.save();
          // ctx.transform(1,0,0,1,data.translate.x,data.translate.y)
          ctx.translate(
            data.translate.x + data.physics.vx,
            data.translate.y + data.physics.vy
          );
          ctx.scale(data.scale.x, data.scale.y);
          ctx.rotate(data.rotate);
          ctx.fillStyle = data.fill ? data.fill : "transparent";
          ctx.strokeStyle = data.stroke;
          ctx.lineWidth = data.strokeWidth;
          ctx.shadowBlur = data.shadow;
          ctx.shadowColor = data.shadowColor;
          ctx.shadowOffsetX = data.shadowX;
          ctx.shadowOffsetY = data.shadowY;
          // data.afterClip ? ctx.clip() : null;
          ctx.clearRect(data.x, data.y, data.width, data.height);
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          break;
      }
    });
  },
  entity: function(data) {
    var tempData = new canvas._newDataModule();
    var dataKey = Object.keys(data);
    var dataValues = Object.values(data);

    dataKey.forEach(function(v, i) {
      tempData[v] = dataValues[i];
    });

    canvas.store.push(tempData);
    this.data = tempData;
  },
  _newDataModule: function() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.fill = "#000";
    this.stroke = "#00000050";
    this.type = "rect";
    this.textMax = 100000;
    this.strokeWidth = 0;
    this.bx = 0;
    this.by = 0;
    this.number = canvas.app.indexEntity++;
    this.id = Math.floor(Math.random() * 99999);
    this.render = true;
    this.imageURl = "NOT_FOUND_IMAGE_URL";
    this.radius = 0;
    this.arcLevel = 0;
    this.shadowColor = "#000";
    this.shadowX = 0;
    this.shadowY = 0;
    this.afterClip = false;
    this.text = "TEXT_IS_EMPTY";
    this.translate = {
      x: 0,
      y: 0,
    };
    this.scale = {
      x: 1,
      y: 1,
    };
    this.rotate = 0;
    this.fontSize = 30;
    this.font = "sans-serif";
    this.dx = 0;
    this.dy = 0;
    this.dWidth = 100;
    this.dHeight = 100;
    this.name = "NOT_NAME_SETTELD";
    this.destroy = function() {
      canvas.store.splice(this.number, 1);
      canvas.idStorage.splice(this.number, 1);
      var self = this;

      Object.keys(this).forEach(function(v, i) {
        self[v] = null;
      });
    };
    this.shadow = 0;
    this.physics = {
      type: 'dynamic',
      enabled: false,
      weight: 0,
      damping: 0,
      toWeight: false,
      sponging: false,
      vx: 0,
      vy: 0,
    };
    this.tags = [];
    this.imageSizeAuto = false;
    this.on = function(type, callback) {
      var element = {
        top: this.y,
        left: this.x,
        height: this.height,
        width: this.height,
      }

      canvas.canvasElem.addEventListener(type, function(e) {
        switch (type) {
          case 'click':
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'mousemove':
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'mousedown':
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'mouseup':
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'touchmove':
          case 'touchend':
            e = e.changedTouches[0];
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'touchstart':
            e = e.touches[0]
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
        }
      })
    }
    this.off = function(type, callback) {
      var element = {
        top: this.y,
        left: this.x,
        height: this.height,
        width: this.height,
      }

      canvas.canvasElem.removeEventListener(type, function(e) {
        switch (type) {
          case 'click':
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'mousemove':
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'mousedown':
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'mouseup':
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'touchmove':
          case 'touchend':
            e = e.changedTouches[0];
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
          case 'touchstart':
            e = e.touches[0]
            var y = e.clientY;
            var x = e.clientX;
            if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
              callback(e)
            }
            break;
        }
      })
    }
    canvas.idStorage.push(this.id);
  },
  clear: function() {
    canvas.canvasCtx.clearRect(
      0,
      0,
      canvas.canvasElem.width,
      canvas.canvasElem.height
    );
  },
  app: {
    count: function(from, to, callback, howMany, speed) {
      var plusValue = from;
      var countValue = 1;
      var countSpeed = 100;

      if (speed === undefined) {
        countSpeed = 100;
      } else {
        countSpeed = speed;
      }

      var timer = setInterval(function() {
        callback(plusValue);

        if (howMany === undefined) {
          countValue = 1;
        } else {
          countValue = howMany;
        }

        plusValue += countValue;
        if (plusValue == to || plusValue > to) {
          clearInterval(timer);
        }
        if (plusValue === to || plusValue > to) {
          clearInterval(timer);
        }
      }, countSpeed);
      return plusValue;
    },
    keyboard: {
      value: false,
      press: function(key) {
        var keyboardEVT = new KeyboardEvent("keypress", {
          bubbles: true,
          keyCode: key,
          charCode: key,
        });

        // dispatchEvent(keyboardEVT)
        window.onkeyup = function(e) {
          console.log(keyboardEVT);
          keyboard.value = false;
        };

        return keyboard.value;
      },
    },
    indexEntity: 0,
    css: function(string) {
      var style = document.createElement("style");
      style.innerHTML = string;
      document.head.appendChild(style);
    },
    globalPhysics: {
      gravity: 4,
      fog: 0,
    },
    addPhysics: function(entity, kg) {
      var baitValue = kg * canvas.app.globalPhysics.gravity;
      var kilogram = baitValue / 5;
      console.log(kilogram);

      if (entity.physics) {
        physics(entity);
      } else if (entity.data.physics) {
        physics(entity.data);
      }

      function physics(entity1) {
        canvas.app.count(
          0,
          100,
          function(y) {
            entity1.physics.vy = y;
          },
          1,
          kilogram
        );
      }
    },
    HTML: {
      input: function(type, x, y) {
        var inp = document.createElement("input");
        inp.type = type;
        if (x != undefined) {
          inp.style.position = "fixed";
          inp.style.left = x + "px";
        }
        if (y != undefined) {
          inp.style.position = "fixed";
          inp.style.top = y + "px";
        }
        document.body.appendChild(inp);

        return inp;
      },
    },
    update: function() {},
    randomNumberOnly: function(start, to) {
      var array = [];
      for (
        i = start; start < to ? i <= to : i >= to; start < to ? i++ : i--
      ) {
        array.push(start < to ? i : -i);
      }

      return array[Math.floor(Math.random() * array.length)];
    },
    randomColor: function(light) {
      if (light == undefined || light === undefined || light == null) {
        var colorCode = [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    0,
                    "a",
                    "b",
                    "c",
                    "d",
                    "e",
                    "f",
                ];
        var colorCodeGen =
          "#" +
          colorCode[Math.floor(Math.random() * colorCode.length)] +
          colorCode[Math.floor(Math.random() * colorCode.length)] +
          colorCode[Math.floor(Math.random() * colorCode.length)] +
          colorCode[Math.floor(Math.random() * colorCode.length)] +
          colorCode[Math.floor(Math.random() * colorCode.length)] +
          colorCode[Math.floor(Math.random() * colorCode.length)];
        return colorCodeGen;
      } else {
        if (light instanceof Boolean || typeof light == "boolean") {
          if (light == true) {
            var colorCode = ["a", "b", "c", "d", "e", "f"];
            var colorCodeGen =
              "#" +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ];
            return colorCodeGen;
          } else {
            var colorCode = [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            0,
                            "a",
                            "b",
                            "c",
                            "d",
                            "e",
                            "f",
                        ];
            var colorCodeGen =
              "#" +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ] +
              colorCode[
                Math.floor(Math.random() * colorCode.length)
              ];
            return colorCodeGen;
          }
        } else {
          console.log("%c please write Boolean code", "color: red");
        }
      }
    },
  },
  repeatRender: function() {
    window.requestAnimationFrame(function(dt) {
      canvas.clear();
      canvas.render();
      if (canvas.app.update instanceof Function) {
        canvas.app.update();
      } else {
        console.warn("set function value in update");
      }
      canvas.repeatRender();
    });
  },
  entityGroup: class entityGroup {
    constructor(name) {
      name == undefined ? null : this.name = name
    }
    name = null;
    entities = [];
    add(entity) {
      this.entities.push(entity)
    }
  }
};

///////////////////////////////////////////////////////////////////////////////////////////
//                                      Text Editor                                      //
///////////////////////////////////////////////////////////////////////////////////////////

// const textEditor = {
//     editorElem: 'EDITOR_NOT_SETTED',
//     value: '',
//     getIndicesOf: function (searchStr, str, caseSensitive) {
//         var searchStrLen = searchStr.length;
//         if (searchStrLen == 0) {
//             return [];
//         }
//         var startIndex = 0, index, indices = [];
//         if (!caseSensitive) {
//             str = str.toLowerCase();
//             searchStr = searchStr.toLowerCase();
//         }
//         while ((index = str.indexOf(searchStr, startIndex)) > -1) {
//             indices.push(index);
//             startIndex = index + searchStrLen;
//         }
//         return indices;
//     },
//     setEditor: function (elem) {
//         this.editorElem = elem;
//         this.value = this.editorElem.innerText;

//     },
//     highLightValue: function () {

//         this.editorElem.className = ' my-editor'

//         var varHighLight = textEditor.editorElem.innerHTML.replaceAll('var', '<var>var</var>');
//         textEditor.editorElem.innerHTML = varHighLight;

//         var asignSymbol = textEditor.editorElem.innerHTML.replaceAll('=', '<red>=</red>');
//         textEditor.editorElem.innerHTML = asignSymbol;

//         var leftBraseHighLight = textEditor.editorElem.innerHTML.replaceAll('{', '<blue>{</blue>');
//         textEditor.editorElem.innerHTML = leftBraseHighLight;

//         var requireValues = ['}', '(', ';', ')', 'function', '+', '-', '%', '*', '?', '&&', 'this', '.']
//         var replaceValues = ['blue', 'pink', 'blue', 'pink', 'blue_i', 'blue', 'blue', 'blue', 'blue', 'red', 'pink', 'blue_i', 'red']
//         requireValues.forEach(function (values, index) {
//             textEditor.editorElem.innerHTML = textEditor.editorElem.innerHTML.replaceAll(values, '<' + replaceValues[index] + '>' + values + '</' + replaceValues[index] + '>');
//         })

//         var orginalEditor = document.createElement('textarea')
//         orginalEditor.id = 'orgEditor';
//         orginalEditor.value = this.value
//         orginalEditor.onclick = function () {
//             textEditor.value = orginalEditor.value;
//             textEditor.innerHTML = textEditor.value;
//             textEditor.highLightValue()
//             console.log(9);
//         }

//         var getNowValue = textEditor.editorElem.innerHTML;
//         textEditor.editorElem.innerHTML = `<pre><code class='code'>${getNowValue}</code></pre>`;
//         this.editorElem.appendChild(orginalEditor)

//         var myCodeStyle = document.createElement('style')
//         myCodeStyle.innerHTML = `
//         var {
//             color: red
//         }

//         red {
//             color: red
//         }

//         .my-editor {
//             font-family: monospace;
//             background: #eee;
//             padding: 0.5rem;
//         }

//         pink {
//             color: #ff22c8;
//         }

//         pre {
//             margin: 0
//         }

//         blue {
//             color: blue;
//         }

//         blue_i {
//             color: blue;
//             font-style: italic;
//         }

//         #orgEditor {
//             opacity: 20%;
//             min-width: 50px;
//             min-height: 50px;
//             width: ${document.querySelector('.code').offsetWidth}px;
//             height: ${document.querySelector('.code').offsetHeight}px;
//             position: absolute;
//             top: ${document.querySelector('.code').offsetTop}px;
//             left: ${document.querySelector('.code').offsetLeft}px;
//             border: none;
//             outline: none;
//             resize: none;
//         }
//         `
//         document.head.appendChild(myCodeStyle)
//     },
//     resetValue: function () {
//         if (document.getElementById('orgEditor')) {
//             document.getElementById('orgEditor').remove()
//         }
//         this.editorElem.innerHTML = this.value;
//     }

// }
