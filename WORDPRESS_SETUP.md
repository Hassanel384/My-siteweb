# Configuration WordPress pour Claritas

## Problème actuel

L'erreur "WordPress API error: Not Found" signifie que le custom post type `produits` n'existe pas encore dans WordPress.

## Solution : Configurer WordPress

### 1. Créer le Custom Post Type "Produits"

Ajoutez ce code dans le fichier `functions.php` de votre thème WordPress :

```php
// Enregistrer le Custom Post Type "Produits"
function claritas_register_produits_post_type() {
    $labels = array(
        'name'               => 'Produits',
        'singular_name'      => 'Produit',
        'add_new'            => 'Ajouter un produit',
        'add_new_item'       => 'Ajouter un nouveau produit',
        'edit_item'          => 'Modifier le produit',
        'new_item'           => 'Nouveau produit',
        'view_item'          => 'Voir le produit',
        'search_items'       => 'Rechercher des produits',
        'not_found'          => 'Aucun produit trouvé',
        'not_found_in_trash' => 'Aucun produit dans la corbeille'
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true, // Important pour l'API REST
        'rest_base'           => 'produits',
        'menu_icon'           => 'dashicons-products',
        'supports'            => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'rewrite'             => array('slug' => 'produits'),
    );

    register_post_type('produits', $args);
}
add_action('init', 'claritas_register_produits_post_type');

// Ajouter les champs personnalisés ACF pour les produits
function claritas_register_product_fields() {
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_produits',
            'title' => 'Informations Produit',
            'fields' => array(
                array(
                    'key' => 'field_technical_specs',
                    'label' => 'Spécifications techniques',
                    'name' => 'technical_specs',
                    'type' => 'wysiwyg',
                ),
                array(
                    'key' => 'field_pdf_file',
                    'label' => 'Fichier PDF',
                    'name' => 'pdf_file',
                    'type' => 'file',
                    'return_format' => 'url',
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
        ));
    }
}
add_action('acf/init', 'claritas_register_product_fields');
```

### 2. Activer les permaliens

1. Allez dans **Réglages > Permaliens** dans WordPress
2. Sélectionnez "Nom de l'article" ou une structure personnalisée
3. Cliquez sur "Enregistrer les modifications"

### 3. Vérifier l'API REST

Testez l'API dans votre navigateur :
- Posts : `http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2/posts`
- Produits : `http://wordpress-hccswwg4so84ow0g8wokksg8.144.91.77.92.sslip.io/wp-json/wp/v2/produits`

### 4. Ajouter du contenu de test

1. Dans WordPress, allez dans **Produits > Ajouter**
2. Créez quelques produits de test avec :
   - Titre
   - Description
   - Image à la une
   - Spécifications techniques (ACF)
   - Fichier PDF (ACF)

3. Créez aussi quelques articles de blog dans **Articles**

## Alternative : Mode développement sans WordPress

Si WordPress n'est pas encore configuré, le site fonctionnera quand même mais affichera des listes vides. Les erreurs sont maintenant gérées gracieusement.

Pour tester le site sans WordPress :
```bash
npm run dev
```

Le site s'affichera correctement mais sans contenu dynamique jusqu'à ce que WordPress soit configuré.

## Plugins WordPress recommandés

1. **Advanced Custom Fields (ACF)** - Pour les champs personnalisés
2. **Yoast SEO** - Pour le SEO
3. **WP REST API Controller** - Pour plus de contrôle sur l'API

## Vérification

Une fois WordPress configuré, redémarrez le serveur Next.js :
```bash
npm run dev
```

Le contenu devrait maintenant s'afficher correctement !
