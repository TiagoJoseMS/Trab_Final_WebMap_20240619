// Registra a biblioteca Proj4js com o OpenLayers para permitir transformações de coordenadas.
ol.proj.proj4.register(proj4);

// Define a projeção SIRGAS 2000 (EPSG:4674) no Proj4js, caso seja necessária para alguma transformação futura.
// Embora a preferência seja requisitar dados WFS diretamente na projeção do mapa (EPSG:3857 ou EPSG:4326 conforme o caso).
if (!proj4.defs["EPSG:4674"]) {
    proj4.defs("EPSG:4674","+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs");
    // Re-registra o Proj4js após adicionar a nova definição.
    ol.proj.proj4.register(proj4);
}

// Array para armazenar camadas WMS (atualmente não utilizado, mas mantido por padrão do qgis2web).
var wms_layers = [];

// --- Definição das Camadas Base (Background Maps) ---

// Camada Google Satellite
var lyr_GoogleSatellite_0 = new ol.layer.Tile({
    title: 'Google Satellite', // Título exibido no controle de camadas.
    type: 'base', // Define como camada base (apenas uma pode ser ativa por vez).
    opacity: 1.0, // Opacidade inicial da camada.
    source: new ol.source.XYZ({ // Fonte de tiles XYZ.
        attributions: '· <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>', // Atribuição de dados.
        url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}' // URL do serviço de tiles do Google Satellite.
    })
});

// Camada OpenStreetMap
var lyr_OpenStreetMap_1 = new ol.layer.Tile({
    title: 'OpenStreetMap', // Título exibido no controle de camadas.
    type: 'base', // Define como camada base.
    opacity: 1.0,
    source: new ol.source.XYZ({
        attributions: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // Atribuição de dados.
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' // URL do serviço de tiles do OpenStreetMap.
    })
});

// --- Definição das Camadas Vetoriais (Arquivos GeoJSON Locais) ---

// Camada: Biomas Brasileiros
var format_Brazilianbiomeborder_0 = new ol.format.GeoJSON(); // Formato para ler GeoJSON.
// Lê as feições do arquivo GeoJSON (variável 'json_Brazilianbiomeborder_0' definida em outro arquivo .js)
// e as reprojeta da projeção original (EPSG:4326 - WGS84) para a projeção do mapa (EPSG:3857 - Web Mercator).
var features_Brazilianbiomeborder_0 = format_Brazilianbiomeborder_0.readFeatures(json_Brazilianbiomeborder_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Brazilianbiomeborder_0 = new ol.source.Vector({ // Fonte de dados vetoriais.
    attributions: ' ', // Atribuição (pode ser preenchida com a fonte dos dados).
});
jsonSource_Brazilianbiomeborder_0.addFeatures(features_Brazilianbiomeborder_0); // Adiciona as feições lidas à fonte.
var lyr_Brazilianbiomeborder_0 = new ol.layer.Vector({ // Cria a camada vetorial.
                declutter: false, // Desativa o decluttering (evita sobreposição de labels/ícones).
                source:jsonSource_Brazilianbiomeborder_0, // Define a fonte de dados.
                style: style_Brazilianbiomeborder_0, // Aplica o estilo definido em 'styles/Brazilianbiomeborder_0_style.js'.
                popuplayertitle: 'Brazilian biome border', // Título usado no popup (se configurado).
                interactive: true, // Define se a camada é interativa (permite popups, seleção, etc.).
                // Título e legenda HTML exibidos no controle de camadas.
                title: 'Biomas Brasileiros<br />\
    <img src="styles/legend/Brazilianbiomeborder_0_0.png" /> Amazônia<br />\
    <img src="styles/legend/Brazilianbiomeborder_0_1.png" /> Caatinga<br />\
    <img src="styles/legend/Brazilianbiomeborder_0_2.png" /> Cerrado<br />\
    <img src="styles/legend/Brazilianbiomeborder_0_3.png" /> Mata Atlântica<br />\
    <img src="styles/legend/Brazilianbiomeborder_0_4.png" /> Pampa<br />\
    <img src="styles/legend/Brazilianbiomeborder_0_5.png" /> Pantanal<br />' 
            });

// Camada: Terras Indígenas (FUNAI)
var format_TerrasindgenasFUNAI_1 = new ol.format.GeoJSON();
var features_TerrasindgenasFUNAI_1 = format_TerrasindgenasFUNAI_1.readFeatures(json_TerrasindgenasFUNAI_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_TerrasindgenasFUNAI_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_TerrasindgenasFUNAI_1.addFeatures(features_TerrasindgenasFUNAI_1);
var lyr_TerrasindgenasFUNAI_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_TerrasindgenasFUNAI_1, 
                style: style_TerrasindgenasFUNAI_1, // Estilo de 'styles/TerrasindgenasFUNAI_1_style.js'.
                popuplayertitle: 'Terras indígenas (FUNAI)',
                interactive: true,
                title: '<img src="styles/legend/TerrasindgenasFUNAI_1.png" /> Terras indígenas (FUNAI)' // Título e legenda.
            });

// Camada: Amazônia Legal
var format_BrazilianLegalAmazon_2 = new ol.format.GeoJSON();
var features_BrazilianLegalAmazon_2 = format_BrazilianLegalAmazon_2.readFeatures(json_BrazilianLegalAmazon_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BrazilianLegalAmazon_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BrazilianLegalAmazon_2.addFeatures(features_BrazilianLegalAmazon_2);
var lyr_BrazilianLegalAmazon_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BrazilianLegalAmazon_2, 
                style: style_BrazilianLegalAmazon_2, // Estilo de 'styles/BrazilianLegalAmazon_2_style.js'.
                popuplayertitle: 'Brazilian Legal Amazon',
                interactive: true,
                title: '<img src="styles/legend/BrazilianLegalAmazon_2.png" /> Amazônia Legal' // Título e legenda.
            });

// --- Definição de Camadas de Serviços Externos (WMS e WFS) ---

// Camada WMS: Focos de Calor NASA FIRMS (VIIRS NOAA-21, últimos 7 dias)
var lyr_VIIRSNOAA217daysfireshotspots_3 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({ // Fonte de tiles WMS.
        url: "https://firms.modaps.eosdis.nasa.gov/mapserver/wms/fires/2f89b39894a182fd267410a42e17fe54", // URL do serviço WMS (inclui chave API).
        attributions: ' <a href="https://firms.modaps.eosdis.nasa.gov/">NASA FIRMS</a>', // Atribuição.
        params: { // Parâmetros específicos do WMS.
            "LAYERS": "fires_viirs_noaa21_7", // Nome da camada no servidor WMS.
            "TILED": "true", // Solicita tiles (imagens menores) em vez de uma imagem única.
            "VERSION": "1.1.1" // Versão do WMS.
        },
    })),
    title: 'VIIRS NOAA-21 7 days fires/hotspots (WMS)', // Título no controle de camadas.
    opacity: 1.0
});

// Camada WFS: Unidades de Conservação Federais (ICMBio)
var wfsSource_UC_2 = new ol.source.Vector({ // Fonte vetorial que busca dados via WFS.
    format: new ol.format.GeoJSON(), // Formato esperado dos dados WFS (GeoJSON).
    url: function(extent, resolution, projection) { // Função que gera a URL da requisição WFS dinamicamente.
        // Monta a URL da requisição WFS 1.1.0 para buscar feições dentro da extensão (bbox) visível no mapa.
        // Solicita os dados diretamente na projeção do mapa (EPSG:4326 neste caso, mas poderia ser 3857) para evitar reprojeção no cliente.
        const wfsUrl = 'https://geoservicos.inde.gov.br/geoserver/ICMBio/ows?service=WFS&version=1.1.0' +
                    '&request=GetFeature&typename=ICMBio:limiteucsfederais_a' + // Nome da camada WFS no servidor.
                    '&outputFormat=application/json' + // Formato de saída desejado.
                    '&srsname=EPSG:4326' +             // Sistema de referência espacial desejado para os dados retornados.
                    '&bbox=' + extent.join(',') + ',EPSG:4326'; // Bounding box (extensão) da área visível, na projeção especificada.
        // console.log("WFS UC URL:", wfsUrl); // Log para depuração (opcional).
        return wfsUrl;
    },
    strategy: ol.loadingstrategy.bbox, // Estratégia de carregamento: busca dados apenas para a área visível (bbox).
    attributions: ' <a href="https://www.gov.br/icmbio/pt-br">ICMBio</a>' // Atribuição da fonte dos dados.
});

// Adiciona listeners para tratar erros e sucesso no carregamento das feições WFS (útil para depuração).
wfsSource_UC_2.on('featuresloaderror', function(event) {
    console.error('Erro ao carregar feições WFS para Unidades de Conservação:', event);
    alert('Falha ao carregar dados das Unidades de Conservação (WFS). Verifique o console do navegador (F12).');
});
wfsSource_UC_2.on('featuresloadend', function(event) {
    if (event.features.length === 0) {
        console.warn("WFS Unidades de Conservação: Nenhuma feição carregada para a extensão atual. Verifique URL/parâmetros.");
    } else {
        // console.log("WFS Unidades de Conservação: Feições carregadas:", event.features.length); // Log de sucesso (opcional).
    }
});

// Cria a camada vetorial para as Unidades de Conservação usando a fonte WFS definida acima.
var lyr_UC_2 = new ol.layer.Vector({
    source: wfsSource_UC_2,
    style: style_UC_2, // Aplica o estilo definido em 'styles/UC_2_style.js'.
    title: '<img src="styles/legend/UC_2.png" /> UC (WFS)', // Título e legenda no controle de camadas.
    popuplayertitle: 'UC', // Título no popup.
    interactive: true, // Permite interação (ex: para criação de buffer sobre as UCs).
    declutter: false
});

// --- Camadas WFS: Focos de Calor NASA FIRMS (VIIRS NOAA-21, últimas 24 horas) - Pontos Clusterizados e Heatmap ---

// Fonte WFS base (comum para heatmap e pontos clusterizados)
var wfsSource_Fires24h_base = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: function(extent, resolution, projection) {
        // IMPORTANTE: A chave API '2f89b39894a182fd267410a42e17fe54' é pessoal e deve ser válida e ativa para acesso WFS.
        const wfsUrl = 'https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/South_America/2f89b39894a182fd267410a42e17fe54/?service=WFS&version=1.1.0' +
                    '&request=GetFeature&typename=fires_noaa21_24hrs' + // Nome da camada WFS dos focos de 24h.
                    '&outputFormat=application/json' +
                    '&srsname=EPSG:4326' + // Solicita dados em WGS84 (projeção do mapa).
                    '&bbox=' + extent.join(',') + ',EPSG:4326';
        // console.log("WFS Fires 24h URL:", wfsUrl); // Log para depuração (opcional).
        return wfsUrl;
    },
    strategy: ol.loadingstrategy.bbox,
    attributions: ' <a href="https://firms.modaps.eosdis.nasa.gov/">NASA FIRMS</a>'
});

// Listeners de erro e sucesso para a fonte WFS dos focos de 24h.
wfsSource_Fires24h_base.on('featuresloaderror', function(event) {
    console.error('Erro ao carregar feições WFS para Focos 24h:', event);
    alert('Falha ao carregar dados de Focos de Calor 24h (WFS). Verifique sua chave API e o console do navegador (F12).');
});
wfsSource_Fires24h_base.on('featuresloadend', function(event) {
    if (event.features.length === 0) {
        console.warn("WFS Focos 24h: Nenhuma feição carregada. Verifique URL, API Key e parâmetros.");
    } else {
        // console.log("WFS Focos 24h: Feições carregadas:", event.features.length); // Log de sucesso (opcional).
    }
});

// Camada Heatmap (Mapa de Calor) para os focos de 24h
var lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspotsheatmap_4 = new ol.layer.Heatmap({
    source: wfsSource_Fires24h_base, // Usa a mesma fonte WFS dos pontos.
    blur: 15, // Nível de desfoque do heatmap.
    radius: 10, // Raio de influência de cada ponto no heatmap.
    weight: function(feature) { // Função para definir o "peso" de cada ponto no heatmap.
        // Tenta usar o atributo Fire Radiative Power (FRP) como peso.
        // Verifica nomes comuns para o atributo ('frp' ou 'FRP').
        var frp = feature.get('frp') || feature.get('FRP');
        // Retorna o FRP normalizado/escalado ou um peso padrão se FRP não estiver disponível.
        return frp ? parseFloat(frp) / 50 : 0.5; // Ajustar escala conforme necessário.
    },
    title: 'Focos 24h - Heatmap (WFS)', // Título no controle de camadas.
    popuplayertitle: 'Focos 24h - Heatmap', // Título no popup (geralmente não aplicável a heatmaps).
    interactive: false // Heatmaps geralmente não são interativos para popups.
});

// Camada de Pontos Clusterizados (Agrupados) para os focos de 24h
var clusterSource_Fires24h_5 = new ol.source.Cluster({ // Fonte que agrupa feições próximas.
    distance: 40, // Distância em pixels para agrupar feições.
    minDistance: 20, // Distância mínima em pixels entre clusters.
    source: wfsSource_Fires24h_base // Usa a mesma fonte WFS dos pontos originais.
});

// Cache para otimizar a criação de estilos de cluster.
var styleCache_Fires24h_5 = {};
// Cria a camada vetorial para os pontos clusterizados.
var lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5 = new ol.layer.Vector({
    source: clusterSource_Fires24h_5, // Usa a fonte de cluster.
    style: function(feature) { // Função que define o estilo dinamicamente para cada cluster/ponto.
        var featuresInCluster = feature.get('features'); // Obtém as feições originais dentro do cluster.
        var size = featuresInCluster.length; // Número de feições no cluster.
        var style = styleCache_Fires24h_5[size]; // Tenta obter o estilo do cache.
        if (!style) { // Se o estilo não está no cache, cria um novo.
            let baseStyleObject;
            // Tenta obter o estilo base definido em 'styles/SouthAmericaVIIRSNOAA2124hrsfireshotspots_5_style.js'.
            if (typeof style_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5 === 'function') {
                // Se o estilo original for uma função (ex: baseado em atributos), aplica ao primeiro ponto do cluster.
                baseStyleObject = style_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5(featuresInCluster[0], null);
            } else if (style_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5) {
                // Se for um objeto de estilo, clona-o.
                baseStyleObject = style_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5.clone();
            } else {
                // Se nenhum estilo base for encontrado, usa um estilo padrão.
                baseStyleObject = new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 6,
                        fill: new ol.style.Fill({color: 'rgba(255,0,0,0.7)'}),
                        stroke: new ol.style.Stroke({color: '#ffffff', width: 1})
                    })
                });
            }

            // Adiciona o texto com a contagem de pontos ao centro do cluster.
            baseStyleObject.setText(new ol.style.Text({
                text: size.toString(),
                fill: new ol.style.Fill({ color: '#fff' }),
                stroke: new ol.style.Stroke({ color: 'rgba(0,0,0,0.8)', width: 3 }),
                font: 'bold 12px sans-serif',
                offsetX: 0,
                offsetY: 0
            }));

            // Opcional: Ajusta o raio do ícone do cluster com base no número de pontos agrupados.
            if (size > 1 && baseStyleObject.getImage() && baseStyleObject.getImage().setRadius) {
                 let baseRadius = (baseStyleObject.getImage().getRadius ? baseStyleObject.getImage().getRadius() : 6);
                 let newRadius = baseRadius + Math.log(size) * 2; // Aumenta o raio logaritmicamente.
                 baseStyleObject.getImage().setRadius(Math.min(newRadius, 20)); // Limita o raio máximo.
            }

            style = baseStyleObject; // Define o estilo final.
            styleCache_Fires24h_5[size] = style; // Armazena no cache.
        }
        return style; // Retorna o estilo para o cluster/ponto.
    },
    title: 'Focos 24h - Pontos Cluster (WFS)', // Título no controle de camadas.
    popuplayertitle: 'Focos 24h - Pontos Cluster', // Título no popup.
    interactive: true, // Permite interação com os clusters.
    declutter: true // Ativa decluttering para clusters.
});

// --- Configuração da Visibilidade Inicial e Lista de Camadas ---

// Define quais camadas estarão visíveis ao carregar o mapa.
lyr_GoogleSatellite_0.setVisible(true);
lyr_OpenStreetMap_1.setVisible(false);
lyr_Brazilianbiomeborder_0.setVisible(false);
lyr_TerrasindgenasFUNAI_1.setVisible(false);
lyr_BrazilianLegalAmazon_2.setVisible(false);
lyr_UC_2.setVisible(false);
lyr_VIIRSNOAA217daysfireshotspots_3.setVisible(false); // WMS 7 dias
lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspotsheatmap_4.setVisible(true); // Heatmap 24h
lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5.setVisible(false); // Pontos Cluster 24h

// Array contendo todas as camadas que serão gerenciadas pelo controle de camadas.
// Definição da ordem de empilhamento inicial (última da lista fica no topo).
var layersList = [
    lyr_GoogleSatellite_0,
    lyr_OpenStreetMap_1,
	lyr_Brazilianbiomeborder_0,
    lyr_TerrasindgenasFUNAI_1,
	lyr_UC_2, // WFS
	lyr_BrazilianLegalAmazon_2,
    lyr_VIIRSNOAA217daysfireshotspots_3, // WMS
    lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspotsheatmap_4, // Heatmap WFS
    lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5 // Pontos Cluster WFS
];

// --- Configuração de Popups (Informações ao Clicar) ---

// Define 'aliases' (nomes amigáveis) para os atributos que podem aparecer nos popups.
lyr_Brazilianbiomeborder_0.set('fieldAliases', {'bioma': 'Nome do Bioma'});
lyr_TerrasindgenasFUNAI_1.set('fieldAliases', {'terrai_nome': 'Nome da Terra Indígena'});
lyr_BrazilianLegalAmazon_2.set('fieldAliases', {'sprclasse': 'Nome'});
lyr_UC_2.set('fieldAliases', {'nomeuc': 'Nome da UC'});
lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5.set('fieldAliases', {'acq_date': 'Data Aquisição'}); // Alias para data dos focos.

// Define 'fieldImages' (tipos de campos) - usado por algumas funcionalidades do qgis2web (mantido por compatibilidade).
lyr_Brazilianbiomeborder_0.set('fieldImages', {'bioma': 'TextEdit'});
lyr_TerrasindgenasFUNAI_1.set('fieldImages', {'terrai_nome': 'TextEdit'});
lyr_BrazilianLegalAmazon_2.set('fieldImages', {'sprclasse': 'TextEdit'});
lyr_UC_2.set('fieldImages', {'nomeuc': 'TextEdit'});
lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5.set('fieldImages', {'acq_date': 'DateTime'}); // Tipo data/hora.

// Define 'fieldLabels' (como os campos devem ser exibidos no popup).
// 'header label': Usa o valor do campo como título principal do popup.
// 'inline label': Exibe 'Nome do Campo: Valor'.
// 'no label': Exibe apenas 'Valor'.
// Omitir um campo aqui ou usar um valor diferente de 'header label'/'inline label'/'no label' geralmente o oculta.
// Configurado para mostrar apenas o nome principal como título ('header label').
lyr_Brazilianbiomeborder_0.set('fieldLabels', {'bioma': 'header label'});
lyr_TerrasindgenasFUNAI_1.set('fieldLabels', {'terrai_nome': 'header label'});
lyr_BrazilianLegalAmazon_2.set('fieldLabels', {'sprclasse': 'header label'});
lyr_UC_2.set('fieldLabels', {'nomeuc': 'header label'});
lyr_SouthAmericaVIIRSNOAA2124hrsfireshotspots_5.set('fieldLabels', {'acq_date': 'header label'}); // Mostra a data como título para os focos.

// Mensagem final de log (controle).
console.log("layers.js processado e configurado.");

