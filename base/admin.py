from django.contrib import admin
from .models import * 

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Store)
admin.site.register(Order)

admin.site.register(Challenge)
admin.site.register(ChallengeType)
admin.site.register(ChallengeProgres)


admin.site.register(Wishlist)


