let original = Core.bundle.getProperties();
let edit = Core.bundle.getProperties().copy();
let keys = edit.keys().toSeq();

edit.each((k, v) => {
    let value = keys.random();
    keys.remove(value);
    edit.put(k, original.get(value));
});

Core.bundle.setProperties(edit);

// the
Events.on(ContentInitEvent, () => {
    Vars.content.each(e => {
        if(e.minfo.mod !== null) return;
        if(!(e instanceof UnlockableContent)) return;
        let ee = e.getContentType() + "." + e.name;
        e.localizedName = Core.bundle.get(ee + ".name");
        e.description = Core.bundle.get(ee + ".description");
        e.details = Core.bundle.get(ee + ".details");
    });
});
