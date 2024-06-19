import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import Shortcut from "@/components/ui/shortcut";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
      <section className="relative isolate pt-14">
        <div className="container max-w-4xl">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/course">JavaScript For Beginners</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>1. Introduction</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl sm:text-6xl mt-10 mb-5">1. Introduction</h1>
          <div className="flex flex-col gap-y-5">
            <p>Lorem ipsum dolor sit amet consectetur. In vulputate sit aliquam donec imperdiet mauris. Quam proin libero aliquet nulla. Massa placerat pretium commodo laoreet. Duis curabitur turpis in gravida massa nunc iaculis sed. Viverra sem purus tellus commodo sit. Nunc at ut molestie a maecenas adipiscing scelerisque feugiat ipsum. Proin sed et imperdiet et tempor id leo in aliquet. Facilisi vitae leo nisl ut enim sed faucibus. Eu senectus urna in orci consequat fermentum vel non. Sit duis varius enim lacus. Facilisis at egestas amet interdum. Tincidunt nam tristique bibendum aliquam. Nulla neque ante non diam enim sed.</p>
            <Image src="https://www.w3docs.com/uploads/media/default/0001/05/4482fe09d95a0be765154b9cefff5e07f7fc32ff.png" width="768" height="299" alt=""/>
            <p>Ultrices tortor non vulputate posuere. Pellentesque pulvinar eget ac vel pretium turpis imperdiet. Pellentesque quis mollis non pellentesque a. Sollicitudin lorem nisl nulla at turpis congue ut sed euismod. Commodo viverra elit vulputate aliquet. Varius risus sit tempor vel volutpat platea nisl egestas. Nisl dignissim tempus molestie condimentum sed amet. Scelerisque scelerisque eget sed aliquet congue rutrum. Viverra bibendum viverra nec lacus libero elementum eget ac. Arcu quis feugiat amet aliquam suscipit quisque. In nec aliquam tellus congue. Donec odio cursus nunc quam dolor.</p>
            <p>Enim elit euismod in nisi senectus in dui proin. Lectus vestibulum cursus sed eget purus cum augue pellentesque. Purus lectus aliquam condimentum integer cras in penatibus amet. Nibh tortor augue purus sed sit posuere ut velit. Ligula faucibus posuere dui sed blandit pellentesque a bibendum neque. Magna proin pharetra sollicitudin ornare nunc.</p>
            <p>Vitae euismod phasellus proin quis facilisis leo pellentesque augue sodales. Nibh mi sit tempor tempor fames at dolor malesuada. A elit in lacus varius. Integer et aliquam elementum integer. Sit nisl quisque scelerisque leo malesuada neque imperdiet nunc eget. Non vitae purus aliquam neque viverra aliquet dui. Pellentesque vehicula rhoncus eleifend diam gravida ut sed pharetra ut. Libero dolor leo turpis vulputate bibendum et quis. Iaculis semper tortor non a enim magna. Nec consectetur lectus non felis. Odio arcu accumsan tellus convallis volutpat lacus nunc. Eu dui viverra mattis tortor maecenas. Egestas duis amet augue mi arcu fermentum. In augue enim egestas fermentum nulla fermentum lacus. Porta gravida turpis a neque at porttitor orci justo quisque.</p>
            <p>Auctor et sagittis diam scelerisque in vitae feugiat. Placerat arcu sit ornare potenti nunc nisl. Urna tincidunt ornare nunc luctus nullam nec sagittis scelerisque. Lacus quis aliquet lorem non quis aliquet purus in phasellus. Nibh a condimentum amet tempor egestas congue. Eget semper interdum viverra arcu. Lorem eu diam nullam felis pharetra ut id eget gravida. Sollicitudin lectus velit urna id hendrerit lorem gravida purus aliquam. Tellus egestas elementum tincidunt non elementum. Est odio nibh ut dui quisque dui elit euismod. Consectetur duis in laoreet suscipit.</p>
          </div>
          <div className="flex justify-center mt-10">
            <Button asChild>
              <Link href="/practice">Continue <Shortcut>Ctrl + Enter</Shortcut></Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }
  