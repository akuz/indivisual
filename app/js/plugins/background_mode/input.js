HC.plugins.background_mode.input = _class(false, HC.BackgroundModePlugin, {
    apply: function () {
        var i = this.settings.background_input;
        var id = i + this.settings.background_volume;

        if (this.current() != id) {
            if (i != 'off' && isNaN(parseInt(i))) {
                this.current(id);
                var file = statics.AnimationValues.background_input[i];
                var path = filePath(ASSET_DIR, file);

                var img = new HC.Image(i, path);
                img.update(
                    statics.ControlSettings.tempo,
                    this.layer.diameterVector.x / this.settings.background_volume,
                    this.layer.diameterVector.y / this.settings.background_volume
                );

                this.img = img;

            } else {
                this.layer.setBackground(this.current(false));
            }

        }

        if (this.img) {
            if (!this.img.complete) {
                this.img.render(false, {prc: 0}, '#000000');

            } else {
                this.layer.setBackground(new THREE.CanvasTexture(this.img.getFrame(0)));
                this.img = false;
            }
        }
    }
});