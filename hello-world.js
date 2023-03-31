// Create a new fabric.js canvas
const canvas = new fabric.Canvas('canvas')

// Set the canvas background color
canvas.setBackgroundColor('#ff0000')

// Set the brush size and color
canvas.freeDrawingBrush.width = 10
canvas.freeDrawingBrush.color = '#00ff00'

// Enable free drawing mode
canvas.isDrawingMode = true

// canvasを更新する
canvas.renderAll()

canvas.on('mouse:down', function (options) {
	if(options.target===null){
		console.log('canvas');
		canvas.isDrawingMode = true
	}
});

// canvasでオブジェクト選択ボックスの表示をしない
canvas.selection = false;

function createButton() {
  var button = document.createElement('button')
  button.innerHTML = 'insert image'
  button.onclick = function () {
    // fabric.jsに画像を読み込む
    fabric.Image.fromURL('cat.png', function (img) {
			canvas.isDrawingMode = false

      canvas.add(img)
      // imgを半分のサイズに縮小
      img.scale(0.5)
      // imgをcanvasの中心に移動
      img.center()
      // imgをcanvasの最前面に移動
      // img.set('selectable', true);

			// img.set({
			// 	hasControls:true,
			// 	hasBorders:true,
			// 	cornerSize:20
			// });

			// imgのバウンディングボックスを表示する
			img.setCoords();

			// imgを選択状態にする
			img.set('active', true);


			// imgに表示するバウンディングボックスを拡大縮小だけにしたい
			img.set({
				hasControls:true,
				hasBorders:true,
				cornerSize:20
			});

			img.setControlsVisibility({
				mt:false,
				mb:false,
				ml:false,
				mr:false,
				bl:true,
				br:true,
				tl:true,
				tr:true,
				mtr:true
			});

			// imgを選択する
			canvas.setActiveObject(img);


    })
  }
  document.body.appendChild(button)
}
createButton()
