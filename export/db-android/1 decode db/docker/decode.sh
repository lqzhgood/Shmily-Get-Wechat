DB_KEY=$1


echo "Key is '$DB_KEY'"


if [ -f "/app/EnMicroMsg.db" ];then

    rm -rf /app/decrypted_database.db
    rm -rf /app/decrypted_database.db-journal
    rm -rf /app/EnMicroMsg.db-shm
    rm -rf /app/EnMicroMsg.db-wal

    echo "decoding..."

    sqlcipher /app/EnMicroMsg.db 'PRAGMA key = "'$DB_KEY'"; PRAGMA cipher_use_hmac = off; PRAGMA kdf_iter = 4000; ATTACH DATABASE "decrypted_database.db" AS decrypted_database KEY "";SELECT sqlcipher_export("decrypted_database");DETACH DATABASE /app/decrypted_database;'
    echo "finish."
else
    echo "EnMicroMsg.db is not found."
fi
