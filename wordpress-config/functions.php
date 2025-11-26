<?php
/**
 * Configuration WordPress pour Claritas
 * 
 * Copiez ce code dans le fichier functions.php de votre thème WordPress
 * ou créez un plugin personnalisé avec ce code.
 */

// Enregistrer le Custom Post Type "Produits"
function claritas_register_produits_post_type() {
    $labels = array(
        'name'               => 'Produits Médicaux',
        'singular_name'      => 'Produit Médical',
        'add_new'            => 'Ajouter un produit',
        'add_new_item'       => 'Ajouter un nouveau produit',
        'edit_item'          => 'Modifier le produit',
        'new_item'           => 'Nouveau produit',
        'view_item'          => 'Voir le produit',
        'search_items'       => 'Rechercher des produits',
        'not_found'          => 'Aucun produit trouvé',
        'not_found_in_trash' => 'Aucun produit dans la corbeille',
        'menu_name'          => 'Produits Médicaux'
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true, // IMPORTANT pour l'API REST
        'rest_base'           => 'produits',
        'menu_icon'           => 'dashicons-products',
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'rewrite'             => array('slug' => 'produits'),
        'capability_type'     => 'post',
        'menu_position'       => 5,
        'taxonomies'          => array('category', 'post_tag'),
    );

    register_post_type('produits', $args);
}
add_action('init', 'claritas_register_produits_post_type');

// Ajouter les catégories de produits personnalisées
function claritas_register_product_taxonomy() {
    $labels = array(
        'name'              => 'Catégories de Produits',
        'singular_name'     => 'Catégorie de Produit',
        'search_items'      => 'Rechercher des catégories',
        'all_items'         => 'Toutes les catégories',
        'parent_item'       => 'Catégorie parente',
        'parent_item_colon' => 'Catégorie parente:',
        'edit_item'         => 'Modifier la catégorie',
        'update_item'       => 'Mettre à jour la catégorie',
        'add_new_item'      => 'Ajouter une nouvelle catégorie',
        'new_item_name'     => 'Nom de la nouvelle catégorie',
        'menu_name'         => 'Catégories',
    );

    $args = array(
        'hierarchical'      => true,
        'labels'            => $labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'categorie-produit'),
    );

    register_taxonomy('produit_categorie', array('produits'), $args);
}
add_action('init', 'claritas_register_product_taxonomy');

// Ajouter les champs personnalisés ACF pour les produits
function claritas_register_product_acf_fields() {
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_produits_claritas',
            'title' => 'Informations Produit Claritas',
            'fields' => array(
                array(
                    'key' => 'field_technical_specs',
                    'label' => 'Spécifications techniques',
                    'name' => 'technical_specs',
                    'type' => 'wysiwyg',
                    'instructions' => 'Ajoutez les spécifications techniques du produit',
                    'required' => 0,
                    'default_value' => '',
                    'tabs' => 'all',
                    'toolbar' => 'full',
                    'media_upload' => 1,
                ),
                array(
                    'key' => 'field_pdf_file',
                    'label' => 'Fichier PDF (Fiche technique)',
                    'name' => 'pdf_file',
                    'type' => 'file',
                    'instructions' => 'Téléchargez la fiche technique PDF du produit',
                    'required' => 0,
                    'return_format' => 'url',
                    'library' => 'all',
                    'mime_types' => 'pdf',
                ),
                array(
                    'key' => 'field_product_price',
                    'label' => 'Prix indicatif',
                    'name' => 'product_price',
                    'type' => 'text',
                    'instructions' => 'Prix indicatif du produit (optionnel)',
                    'required' => 0,
                    'placeholder' => 'Sur devis',
                ),
                array(
                    'key' => 'field_product_ref',
                    'label' => 'Référence produit',
                    'name' => 'product_ref',
                    'type' => 'text',
                    'instructions' => 'Référence ou code produit',
                    'required' => 0,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'produits',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
        ));
    }
}
add_action('acf/init', 'claritas_register_product_acf_fields');

// Activer les images à la une pour les produits
function claritas_enable_featured_images() {
    add_theme_support('post-thumbnails', array('produits', 'post'));
    add_image_size('product-thumbnail', 400, 400, true);
    add_image_size('product-large', 800, 800, true);
}
add_action('after_setup_theme', 'claritas_enable_featured_images');

// Ajouter les colonnes personnalisées dans l'admin
function claritas_custom_columns($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['thumbnail'] = 'Image';
    $new_columns['title'] = $columns['title'];
    $new_columns['product_ref'] = 'Référence';
    $new_columns['produit_categorie'] = 'Catégorie';
    $new_columns['date'] = $columns['date'];
    return $new_columns;
}
add_filter('manage_produits_posts_columns', 'claritas_custom_columns');

function claritas_custom_column_content($column, $post_id) {
    switch ($column) {
        case 'thumbnail':
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, array(50, 50));
            } else {
                echo '—';
            }
            break;
        case 'product_ref':
            $ref = get_field('product_ref', $post_id);
            echo $ref ? esc_html($ref) : '—';
            break;
        case 'produit_categorie':
            $terms = get_the_terms($post_id, 'produit_categorie');
            if ($terms && !is_wp_error($terms)) {
                $term_names = array();
                foreach ($terms as $term) {
                    $term_names[] = $term->name;
                }
                echo implode(', ', $term_names);
            } else {
                echo '—';
            }
            break;
    }
}
add_action('manage_produits_posts_custom_column', 'claritas_custom_column_content', 10, 2);

// Flush rewrite rules lors de l'activation du thème/plugin
function claritas_flush_rewrite_rules() {
    claritas_register_produits_post_type();
    claritas_register_product_taxonomy();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'claritas_flush_rewrite_rules');

// Message de bienvenue dans l'admin
function claritas_admin_notice() {
    $screen = get_current_screen();
    if ($screen->id === 'edit-produits') {
        echo '<div class="notice notice-info is-dismissible">';
        echo '<p><strong>Claritas Produits Médicaux</strong> : N\'oubliez pas d\'ajouter une image à la une et les spécifications techniques pour chaque produit.</p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'claritas_admin_notice');
