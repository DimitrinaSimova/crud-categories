$(function () {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:57675/api/categories/data.json",
        dataType: 'json',
        success: function (data) {
            getCategories(data)
        }
    });

    let init = function () {
        bindEvents();
    };

    let bindEvents = function () {

        // $(document).on('click', '.modal__overlay', function (e) {
        //     e.preventDefault();

        //     if ($(e.target).parent('.modal__overlay').length == 0) {
        //         closeModal();
        //     }
        // });

        $(document).on('click', '.btn-close', function () {
            closeModal();
        });

        $('#add-category').on('click', function () {
            $('body').addClass('no-scroll');

            if ($('.modal__add-category').hasClass('d-block')) {
                $('.modal__add-category').removeClass('d-block');
            } else {
                $('.modal__add-category').addClass('d-block');
            }
        });

        $(document).on('click', '.cta__delete', function () {
            $('body').addClass('no-scroll');

            if ($('.modal__delete-category').hasClass('d-block')) {
                $('.modal__delete-category').removeClass('d-block');
            } else {
                $('.modal__delete-category').addClass('d-block');
            }
        });


        $(document).on('click', '#btnSubmit', function () {
            $('#frmAddCategory').submit();
        });

        $('#frmAddCategory').submit(function (e) {
            e.preventDefault();
            addCategory(this);
        });

    }

    let closeModal = function (e) {
        $('body').removeClass('no-scroll');
        $('.modal__overlay').removeClass('d-block')
    }

    init();
});

function getCategories(categories) {
    categories.forEach(category => {
        const assets = (() => {
            switch (category.type) {
                case 'Stream':
                    return { icon: 'icon--tower-cell', bgcolor: 'bg--cat-stream' }
                case 'Movie':
                    return { icon: 'icon--film', bgcolor: 'bg--cat-movie' }
                case 'Radio':
                    return { icon: 'icon--radio', bgcolor: 'bg--cat-radio' }
                case 'Series':
                    return { icon: 'icon--tv', bgcolor: 'bg--cat-series' }
                default: return { icon: '', bgcolor: '' }
            }
        })();

        $('.categories-list__container').append(
            `<div class="categories-list__row">
                <div class="category__icon ${assets.bgcolor}">\
                    <span class="icon ${assets.icon}"></span>\
                </div>\
                <div class="category__name align-self-center">${category.name}</div>\
                <div class="category__type align-self-center">${category.type}</div>\
                <div class="category__type align-self-center text-center">${category.order}</div>
                <div class="category-cta__wrapper d-flex justify-content-end">\
                    <a href="javascript:;" class="cta__link cta__update" title="Update">\
                        <span class="icon icon--pen"></span>\
                    </a>\
                    <a href="javascript:;" class="cta__link cta__delete" title="Delete">\
                        <span class="icon icon--trash"></span>\
                    </a>\
                </div>\
            </div>`
        )
    });
}

function addCategory(form) {
    const formData = $('#frmAddCategory').serializeArray();
    const formJson = {};

    formData.forEach((input) => {
        formJson[input.name] = input.value;
    });

    const request = $.post("http://localhost/api/categories", formJson);
    getCategories([formJson]);
    form.reset()
    request.done = (function (data) {
        closeModal()
    });
}