fabric.Path.prototype.selectable = false;

// Create a new fabric.js canvas
const canvas = new fabric.Canvas('canvas')

// Set the canvas background color
canvas.setBackgroundColor('#ffffff')

// Set the brush size and color
canvas.freeDrawingBrush.width = 10
canvas.freeDrawingBrush.color = '#ff0000'

// Enable free drawing mode
canvas.isDrawingMode = true

// canvasを更新する
canvas.renderAll()

canvas.on('mouse:down', function (options) {
	if(options.target===null){
		console.log('null(canvas)');
		canvas.isDrawingMode = true
		return;
	}

	if(options.target.type==='path'){
		console.log('path');
		canvas.isDrawingMode = true
		options.target.set('selectable', false);
		// canvas.setActiveObject(null);
		options.target.set('active',false);
		return;
	}

	console.log('options.target.type',options.target.type);

	// mouse:downしたターゲットが画像だったら
	// if(options.target && options.target.type==='image'){
	// 	console.log('image');
	// 	canvas.isDrawingMode = false
	// }
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
