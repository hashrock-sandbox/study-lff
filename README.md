# ラインフォントレンダラ

CAD用のフォント（lffファイル）をロードして描画する。

# TODO

 * lffから直接ロードできるようにする（今はJSONに変換）。
 * 圧縮形式みたいなの作ったら小さくなるかなぁ。座標精度を8bitにすれば数キロバイトにはなりそうだけど。
 * テキストエフェクト
  * start, end, offsetみたいな途中まで書くパラメータ
  * scalex, scaley
  * ポイントにarc置く。
  * びよって伸びるエフェクト。fn(x) => a < x < b ? x + 10 : xみたいな。
 * 描画範囲取れるようにしたい。
