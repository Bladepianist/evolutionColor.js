if (typeof jQuery === 'undefined') { throw new Error('evolutionColor\'s JavaScript requires jQuery') }

function hexToRgb(hex) { // By Tim Down - Stack Overflow

    if (hex === null) { // Add by Bladepianist. Useful when looping on this and "hex" being not fed up sometimes.

        hex = "#fff";
    }
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

$.fn.evolutionColor = function (options) {
    // parameters est un objet littéral

    var defauts = { // Définition paramètres par défaut
        "balise": "em",
        "color": ["#F00", "#FF6200", "#FFC400", "#D4FF00", "#37FF00"],
        "callback": null
    };

    // On fusionne paramètres par défaut et paramètres saisis
    var params = $.extend(defauts, options);

    var seuil = 5 / 100;

    return this.each(function () {

        var element = $(this); // Sauvegarde de notre élement

        $(this).find("tr").slice(1).each(function () { // A améliorer en offset variable
            $(this).find(params.balise).parent().each(function (j) {

                var couleur = params.color[j];
                var alpha = $(this).find("strong").text().replace(",", ".").replace("(", "").replace(")", "").replace("%", "");
                alpha = parseFloat(alpha).toFixed(4) / 100;

                if (alpha > seuil && alpha != 0) {
                    couleur = "rgba(" + hexToRgb(couleur).r + "," + hexToRgb(couleur).g + "," + hexToRgb(couleur).b + "," + alpha + ")";
                    $(this).css("background-color", couleur);
                }
            });
        });

        if (params.callback) {
            params.callback();
        }
    });
};
