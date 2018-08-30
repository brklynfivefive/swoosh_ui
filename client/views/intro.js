$(function () {
    $('#swoosh-intro-view').on('tap', '.product-action', function () {
        $('#swoosh-createAccount-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
                
            }
        });
    });

     $('#swoosh-intro-view').on('tap', '.product-download-action', function () {
        window.open('https://inthenewsrooms.com/start/','_blank');
    });

    $('#swoosh-intro-view').on('tap', '.product-signin-action', function () {
        $('#swoosh-signinAccount-view').banana({set: ['activetrans', 'callback'],
            duration: 400,
            transform: {data: "0, 0, 0"},
            callback: function () {
            }
        });
    });
});