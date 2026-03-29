// ==UserScript==
// @name        Total 3months
// @namespace        http://tampermonkey.net/
// @version        0.4
// @description        アクセス解析3ヵ月分のデータを集計して表示する
// @author        Ameba Blog User
// @match        https://blog.ameba.jp/ucs/analysis/analysis*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameba.jp
// @grant        none
// @updateURL        https://github.com/personwritep/Total_3months/raw/main/Total_3months.user.js
// @downloadURL        https://github.com/personwritep/Total_3months/raw/main/Total_3months.user.js
// ==/UserScript==


let total=[]; // データ総計用 配列
let list_disp=0; // リストの表示フラグ

let target=document.querySelector('#root > div');
let monitor=new MutationObserver(page_change);
if(target){
    monitor.observe(target, { childList: true }); }

page_change();

function page_change(){
    let search=location.search;
    if(!search.includes('order=organic_click_desc')){
        let more=document.querySelector('.p-accessGraph__moreLinkBtn');
        if(more){
            more.click(); }}

    if(search.includes('unit=this_month') ||
       search.includes('unit=one_month_ago') || search.includes('unit=two_months_ago')){
        setTimeout(()=>{
            main(); } ,800); }

} // page_change()



function main(){

    let panel=
        '<div class="sw_panel">'+
        '<button class="disp_aside">Aside</button>'+
        '<button class="disp">Total Display</button>'+
        '<button class="m_sw"></button>'+
        '<button class="m_sw"></button>'+
        '<button class="m_sw"></button>'+
        '<style>.sw_panel { position: absolute; top: 50px; right: calc(50% - 465px); '+
        'z-index: 20; display: flex; flex-direction: row-reverse; '+
        'padding: 4px 6px; border: 1px solid #aaa; background: #fff; } '+
        '.disp, .m_sw, .disp_aside { font: bold 16px Meiryo; color: #000; '+
        'padding: 2px 8px 0; margin: 0 6px; } '+
        '</style></div>';

    if(!document.querySelector('.sw_panel')){
        document.body.insertAdjacentHTML('beforeend', panel); }


    let m_sw=document.querySelectorAll('.sw_panel .m_sw');
    if(m_sw.length==3){
        let S_item=document.querySelectorAll('.c-radioSelect__item');
        for(let k=0; k<3; k++){
            let labelText=S_item[k+4].querySelector('.c-radioSelect__labelText');
            if(labelText){
                m_sw[k].textContent=labelText.textContent; }}

        m_sw[0].onclick=()=>{
            if(location.search.includes('unit=this_month')){
                m_sw[0].disabled=true;
                m_sw[0].style.color="#ccc";
                get_data(); }}

        m_sw[1].onclick=()=>{
            if(location.search.includes('unit=one_month_ago')){
                m_sw[1].disabled=true;
                m_sw[1].style.color="#ccc";
                get_data(); }}

        m_sw[2].onclick=()=>{
            if(location.search.includes('unit=two_months_ago')){
                m_sw[2].disabled=true;
                m_sw[2].style.color="#ccc";
                get_data(); }}}



    function get_data(){
        let PAGLI=document.querySelectorAll('.p-accessAnalysisGraphListItem');
        for(let k=0; k<PAGLI.length; k++){
            let id;
            let title;
            let ac_count;

            let item_link=PAGLI[k].querySelector('.p-accessAnalysisGraphListItem__link');
            if(item_link){
                let url=new URL(item_link.href);
                id=url.searchParams.get('id'); }

            let item_titl=PAGLI[k].querySelector('.p-accessAnalysisGraphListItem__titleText');
            if(item_titl){
                title=item_titl.textContent; }

            let item_count=PAGLI[k].querySelector('.p-accessAnalysisGraphListItem__count');
            if(item_count){
                ac_count=item_count.textContent/1; } // 数値化

            add_data(id, title, ac_count); }

    } // get_data()



    function add_data(id, title, ac_count){
        let index=total.findIndex(row=>row[0]==id);
        if(index!=-1){
            total[index][2]+=ac_count; }
        else{
            total.push([id, title, ac_count]); }}



    let disp=document.querySelector('.sw_panel .disp');
    if(disp){
        disp.addEventListener('click', function(event){
            event.stopImmediatePropagation();
            if(list_disp==0){ // 0:「非表示」 1:「Total」 2:「Aside」
                if(total.length!=0){
                    list_disp=1;
                    sort_data();
                    total_disp(); }}
            else if(list_disp==1){ // 1:「Total」
                list_disp=0;
                if(document.querySelector('#t_panel')){
                    document.querySelector('#t_panel').remove(); }}
            else if(list_disp==2){ // 2:「Aside」
                total_disp_aside_del();
                if(total.length!=0){
                    list_disp=1;
                    sort_data();
                    total_disp(); }}}); }



    let disp_aside=document.querySelector('.sw_panel .disp_aside');
    if(disp_aside){
        disp_aside.addEventListener('click', function(event){
            event.stopImmediatePropagation();
            if(list_disp==0){ // 0:「非表示」 1:「Total」 2:「Aside」
                if(total.length!=0){
                    list_disp=2;
                    total_disp_aside(); }}
            else if(list_disp==1){ // 1:「Total」
                if(document.querySelector('#t_panel')){
                    document.querySelector('#t_panel').remove(); }
                if(total.length!=0){
                    list_disp=2;
                    total_disp_aside(); }}
            else if(list_disp==2){ // 2:「Aside」
                list_disp=0;
                total_disp_aside_del(); }}); }



    function sort_data(){
        total.sort((a, b) => b[2] - a[2]); }



    function total_disp(){
        let t_panel=
            '<div id="t_panel">'+
            '<ul>';

        for(let k=0; k<total.length; k++){
            t_panel+=
                '<li class="li_total">'+
                '<a href="/ucs/analysis/analysis_page_detail.do?id='+ total[k][0] +'" target="_blank">'+
                '<span class="title_total">'+ total[k][1] +'</span>'+
                '<span class="ac_total">'+ total[k][2] +'</span>'+
                '</a></li>'; }

        t_panel+=
            '</ul>'+
            '<style>'+
            '#t_panel { position: fixed; top: 230px; right: 0; height: calc(100vh - 280px); '+
            'font: normal 14px/16px Meiryo; padding: 14px 12px; background: #fff; '+
            'border: 1px solid #ccc; overflow-y: scroll; overscroll-behavior-y: none; } '+
            '.li_total { height: 30px; } '+
            '.li_total a { padding: 4px 0 2px; color: #333; } '+
            '.li_total a:hover { text-decoration: none; background: #e2eef0; } '+
            '.title_total, .ac_total { display: inline-block; padding: 2px 6px; vertical-align: -6px; } '+
            '.title_total { width: 480px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; } '+
            '.ac_total { min-width: 60px; overflow: hidden; } '+
            '</style></div>';

        if(!document.querySelector('#t_panel')){
            document.body.insertAdjacentHTML('beforeend', t_panel); }

    } // total_disp()



    function total_disp_aside(){
        let td_style=
            '<style class="total_disp_style">'+
            '.p-accessAnalysisGraphListItem { position: relative; } '+
            '.assp { display: inline-block; position: absolute; top: 0; right: -60px; '+
            'font: 14px/16px Meiryo; color: #333; height: 16px; padding: 8px 4px 6px; '+
            'width: 50px; text-align: right; background: #fff; } '+
            '</style>';

        if(!document.querySelector('.total_disp_style')){
            document.body.insertAdjacentHTML('beforeend', td_style); }


        let PAGLI=document.querySelectorAll('.p-accessAnalysisGraphListItem');
        for(let k=0; k<PAGLI.length; k++){
            let assp='<span class="assp"></span>';
            if(!PAGLI[k].querySelector('.assp')){
                PAGLI[k].insertAdjacentHTML('beforeend', assp); }}


        for(let k=0; k<PAGLI.length; k++){
            let id;
            let item_link=PAGLI[k].querySelector('.p-accessAnalysisGraphListItem__link');
            if(item_link){
                let url=new URL(item_link.href);
                id=url.searchParams.get('id'); }
            let index=total.findIndex(row=>row[0]==id);
            if(index!=-1){
                let assp=PAGLI[k].querySelector('.assp');
                if(assp){
                    assp.textContent=total[index][2]; }}}

    } // total_disp_aside()



    function total_disp_aside_del(){
        let assp_all=document.querySelectorAll('.p-accessAnalysisGraphListItem .assp');
        for(let k=0; k<assp_all.length; k++){
            assp_all[k].remove(); }}

} // main()
