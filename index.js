$(document).ready(() => {
    const category = $('#select');
    const code = $('#code');
    const nameArtical = $('#nameArtical');
    const description = $('#description');
    const type = $('#type');
    const prize = $('#prize');
    const prizePdv = $('#prizePdv');
    const btnSubmit = $('#btnSubmit');

    code.keyup(function (e) {
        if (/\D/g.test(this.value)) {
            this.value = this.value.replace(/\D/g, '');
        }
    });

    code.change(function () {
        border(code);
        submitFunction();
    });

    nameArtical.change(function () {
        border(nameArtical);
        submitFunction();
    });

    type.change(function(){
        border(type);
        submitFunction();
    });

    function border(a){
        if (a.val() !== '') {
            a.removeClass('redBorder');
        } else {
            a.addClass('redBorder');
        }
    }

    prize.keyup(function (e) {
        if (/\D/g.test(this.value)) {
            this.value = this.value.replace(/\D/g, '');
        }
    });

    
    let d;
    let vreme;
    prize.change(function () {
        prizePdv.val(prize.val() * 1.2);
         d = new Date($.now());
         vreme = d.getDate()+"-"+(d.getMonth() + 1)+"-"+d.getFullYear()+" "+d.getHours()
                +":"+d.getMinutes()+":"+d.getSeconds();
    });

    function submitFunction() {
        if (code.val() == '' || nameArtical.val() == '' || type.val() == '') {
            btnSubmit.attr("disabled", true);
        } else {
            btnSubmit.removeAttr("disabled");
        }
    }

    btnSubmit.click(function (e) {
        e.preventDefault(e);
        $('table').css('visibility', 'visible');
        $('.search').css('visibility', 'visible');
        const red = '<tr><td>'+ category.val() +'</td><td>'+ code.val() +'</td><td id="name">'
                    + nameArtical.val() + '</td><td id="limit" title="'+description.val()+'">'+ description.val() +'</td><td>'+ type.val()
                     +'</td><td>'+ prize.val() +'</td><td>'+prizePdv.val() +'</td><td>'+ vreme +'</td></tr>';
        $('tbody').append(red);
        code.addClass('redBorder');
        nameArtical.addClass('redBorder');
        type.addClass('redBorder');
        btnSubmit.attr("disabled", true);

        $("#table tr").css("background-color", function(index) {
            return index%2==0?"yellow":"orange";
        });
        code.val('');
        nameArtical.val('');
        description.val('');
        type.val('');
        prize.val('');
        prizePdv.val('');
    });

    $('.search').keyup(function(){
        let searchTerm = $('.search').val();
        let listItem = $('results tbody').children('tr');
        let searchSplit = searchTerm.replace(/ /g,"'):containsi('");
        $.extend($.expr[':'], {
            'containsi': function(elem,i,match,array){
                return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "")
                .toLowerCase()) >= 0;
            }
        });
        $(".results tbody tr").not(":containsi('"+ searchSplit +"')").each(function(){
            $(this).attr('visible', 'false');
        })
        $(".results tbody tr:containsi('"+ searchSplit +"')").each(function(){
            $(this).attr('visible', 'true');
        })
        let jobCount = $('.results tbody tr[visible="true"]').length;
        $('.counter').text('Broj traženih artikala: '+jobCount );
        if($('.search').val() === ''){
            $('.counter').val('0');
        }
    });








});



